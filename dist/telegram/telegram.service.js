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
let TelegramBotService = class TelegramBotService {
    constructor(configService) {
        this.configService = configService;
        const token = this.configService.get('BOT_TOKEN');
        this.bot = new TelegramBot(token, { polling: true });
        console.log('Bot instance created');
        const webAppString = this.configService.get('WEB_APP_URL');
        this.WEB_APP_URL = webAppString;
        const authLoginString = this.configService.get('SERVER_URL');
        this.SERVER_URL = authLoginString;
    }
    onModuleInit() {
        console.log('Bot initialized');
        setTimeout(() => {
            this.setupBotCommands();
            this.handleStartCommand();
            this.handleAuthCommand();
            this.handleSupportCommand();
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
        this.bot.onText(/\/start(.*)/, (msg, match) => {
            const chatId = msg.chat.id;
            const parameter = match[1]?.trim();
            if (parameter === 'auth') {
                this.sendAuthMessage(chatId);
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
        this.bot.onText(/\/auth/, (msg) => {
            const chatId = msg.chat.id;
            this.sendAuthMessage(chatId);
        });
    }
    handleSupportCommand() {
        this.bot.onText(/\/support/, (msg) => {
            const chatId = msg.chat.id;
            this.sendSupportMessage(chatId);
        });
    }
    sendAuthMessage(chatId) {
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
    sendSupportMessage(chatId) {
        this.bot.sendMessage(chatId, '🛠 *Техподдержка GraphON*\n\n' +
            '📞 *Как получить помощь?*\n\n' +
            '• Посетите наш канал для новостей\n' +
            '• Или опишите проблему в чате поддержки\n\n', {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: '💬 Чат поддержки',
                            url: 'https://t.me/graph_ON',
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
    __metadata("design:paramtypes", [config_1.ConfigService])
], TelegramBotService);
//# sourceMappingURL=telegram.service.js.map