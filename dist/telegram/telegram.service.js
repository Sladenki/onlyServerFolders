"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramBotService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const TelegramBot = require("node-telegram-bot-api");
const user_service_1 = require("../user/user.service");
const copyright_config_1 = require("../config/copyright.config");
let TelegramBotService = class TelegramBotService {
    constructor(configService, userService) {
        this.configService = configService;
        this.userService = userService;
        const token = this.configService.get('BOT_TOKEN');
        this.bot = new TelegramBot(token, { polling: true });
        console.log('Bot instance created');
        const webAppString = this.configService.get('WEB_APP_URL');
        this.WEB_APP_URL = webAppString;
        const authLoginString = this.configService.get('SERVER_URL');
        this.SERVER_URL = authLoginString;
        const supportUrlString = this.configService.get('SUPPORT_URL');
        this.SUPPORT_URL = supportUrlString;
        const copyrightConfig = (0, copyright_config_1.getCopyrightConfig)(this.configService);
        this.COPYRIGHT_PDF_PATH = copyrightConfig.pdfPath;
    }
    onModuleInit() {
        console.log('Bot initialized');
        setTimeout(() => {
            this.setupBotCommands();
            this.handleStartCommand();
            this.handleAuthCommand();
            this.handleSupportCommand();
            this.handleCallbackQueries();
        }, 1000);
    }
    async getUserProfilePhotos(id) {
        return await this.bot.getUserProfilePhotos(id);
    }
    async setupBotCommands() {
        try {
            await this.bot.setMyCommands([
                {
                    command: 'start',
                    description: '🌟 Главное меню'
                },
                {
                    command: 'auth',
                    description: '🔐 Авторизация'
                },
                {
                    command: 'support',
                    description: '🛠 Техподдержка'
                }
            ]);
        }
        catch (error) {
            console.error('Error setting bot commands:', error);
        }
    }
    handleStartCommand() {
        this.bot.onText(/\/start(.*)/, async (msg, match) => {
            const chatId = msg.chat.id;
            const parameter = match[1]?.trim();
            if (parameter === 'auth') {
                await this.sendAuthMessage(chatId);
                return;
            }
            this.bot.sendMessage(chatId, '🌟 *Добро пожаловать в GraphON!* 🌟\n\n' +
                'Ваш личный гид по менеджменту внеучебных мероприятий.\n\n', {
                parse_mode: "Markdown",
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: '🌐 Открыть приложение',
                                web_app: {
                                    url: this.WEB_APP_URL,
                                    hide_webapp_header: true
                                },
                            },
                        ],
                        [
                            {
                                text: '📢 Telegram канал',
                                url: 'https://t.me/graph_ON',
                            },
                        ],
                    ],
                },
            });
        });
    }
    handleAuthCommand() {
        this.bot.onText(/\/auth/, async (msg) => {
            const chatId = msg.chat.id;
            await this.sendAuthMessage(chatId);
        });
    }
    handleSupportCommand() {
        this.bot.onText(/\/support/, (msg) => {
            const chatId = msg.chat.id;
            this.sendSupportMessage(chatId);
        });
    }
    handleCallbackQueries() {
        this.bot.on('callback_query', async (callbackQuery) => {
            const chatId = callbackQuery.message.chat.id;
            const data = callbackQuery.data;
            if (data === 'show_copyright_agreement') {
                await this.sendCopyrightAgreement(chatId);
            }
            else if (data === 'accept_copyright_agreement') {
                await this.acceptCopyrightAgreement(chatId, callbackQuery.from.id);
            }
            else if (data === 'proceed_to_auth') {
                await this.sendAuthMessage(chatId);
            }
            await this.bot.answerCallbackQuery(callbackQuery.id);
        });
    }
    async sendAuthMessage(chatId) {
        try {
            const user = await this.userService.findByTelegramId(chatId);
            if (user && user.copyrightAgreementAccepted) {
                this.bot.sendMessage(chatId, '🔐 *Авторизация в GraphON*\n\n' +
                    'Для доступа к приложению авторизуйтесь, нажав на кнопку ⬇️\n\n' +
                    '---\n\n' +
                    '📌 *Какие данные мы получим после авторизации?*\n\n' +
                    '- *Telegram ID*\n' +
                    '- *Имя*\n' +
                    '- *Фамилию*\n' +
                    '- *Юзернейм*\n' +
                    '- *Фото профиля*', {
                    parse_mode: "Markdown",
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: '🔐 Авторизоваться',
                                    login_url: {
                                        url: `${this.SERVER_URL}/auth/telegram/callback`,
                                    },
                                },
                            ],
                        ],
                    },
                });
            }
            else {
                this.bot.sendMessage(chatId, '📋 *Соглашение об авторских правах*\n\n' +
                    'Для продолжения необходимо принять соглашение об авторских правах.\n\n' +
                    'Пожалуйста, ознакомьтесь с документом и примите условия.', {
                    parse_mode: "Markdown",
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: '📄 Просмотреть соглашение',
                                    callback_data: 'show_copyright_agreement'
                                },
                            ],
                        ],
                    },
                });
            }
        }
        catch (error) {
            console.error('Error in sendAuthMessage:', error);
            this.bot.sendMessage(chatId, '📋 *Соглашение об авторских правах*\n\n' +
                'Для продолжения необходимо принять соглашение об авторских правах.\n\n' +
                'Пожалуйста, ознакомьтесь с документом и примите условия.', {
                parse_mode: "Markdown",
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: '📄 Просмотреть соглашение',
                                callback_data: 'show_copyright_agreement'
                            },
                        ],
                    ],
                },
            });
        }
    }
    async sendCopyrightAgreement(chatId) {
        try {
            await this.bot.sendDocument(chatId, this.COPYRIGHT_PDF_PATH, {
                caption: '📋 *Соглашение об авторских правах*\n\n' +
                    'Даю свое согласие на обработку моих персональных данных и подтверждаю, что ознакомлен(а) с Политикой конфиденциальности, Положением об обработке данных, Политикой использования файлов cookies.\n\n',
                parse_mode: "Markdown",
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: '✅ Принять соглашение',
                                callback_data: 'accept_copyright_agreement'
                            },
                        ],
                    ],
                },
            });
        }
        catch (error) {
            console.error('Error sending copyright agreement:', error);
            this.bot.sendMessage(chatId, '📋 *Соглашение об авторских правах*\n\n' +
                'К сожалению, не удалось загрузить документ.\n\n' +
                'Пожалуйста, свяжитесь с поддержкой для получения соглашения.', {
                parse_mode: "Markdown",
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: '💬 Обратиться в поддержку',
                                url: this.SUPPORT_URL,
                            },
                        ],
                    ],
                },
            });
        }
    }
    async acceptCopyrightAgreement(chatId, telegramId) {
        try {
            await this.userService.acceptCopyrightAgreement(telegramId);
            this.bot.sendMessage(chatId, '✅ *Соглашение принято!*\n\n' +
                'Теперь вы можете продолжить авторизацию.', {
                parse_mode: "Markdown",
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: '🔐 Продолжить авторизацию',
                                callback_data: 'proceed_to_auth'
                            },
                        ],
                    ],
                },
            });
        }
        catch (error) {
            console.error('Error accepting copyright agreement:', error);
            this.bot.sendMessage(chatId, '❌ *Ошибка*\n\n' +
                'Не удалось сохранить принятие соглашения.\n\n' +
                'Пожалуйста, попробуйте еще раз или обратитесь в поддержку.', {
                parse_mode: "Markdown",
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: '💬 Обратиться в поддержку',
                                url: this.SUPPORT_URL,
                            },
                        ],
                    ],
                },
            });
        }
    }
    sendSupportMessage(chatId) {
        this.bot.sendMessage(chatId, '🛠 *Техподдержка GraphON*\n\n' +
            '📞 *Как получить помощь?*\n\n' +
            '• Опишите проблему в чате поддержки\n\n', {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: '💬 Чат поддержки',
                            url: this.SUPPORT_URL,
                        },
                    ],
                ],
            },
        });
    }
    sendMessage(chatId, message) {
        this.bot.sendMessage(chatId, message);
    }
};
exports.TelegramBotService = TelegramBotService;
exports.TelegramBotService = TelegramBotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService])
], TelegramBotService);
//# sourceMappingURL=telegram.service.js.map