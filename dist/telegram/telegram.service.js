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
const TelegramBot = require("node-telegram-bot-api");
let TelegramBotService = class TelegramBotService {
    constructor() {
        const token = '7910385156:AAG-t9hxo7IpMme864JOwDta1CYS2_Qp2EE';
        this.bot = new TelegramBot(token, { polling: true });
    }
    onModuleInit() {
        console.log('Bot initialized');
    }
    async getUserProfilePhotos(id) {
        return await this.bot.getUserProfilePhotos(id);
    }
    handleStartCommand() {
        this.bot.onText(/\/start/, (msg) => {
            const chatId = msg.chat.id;
            this.bot.sendMessage(chatId, 'Привет! Выберите действие:', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Перейти на сайт',
                                web_app: {
                                    url: 'https://graphon-client.onrender.com/',
                                },
                            },
                        ],
                        [
                            {
                                text: 'Авторизоваться через Telegram',
                                login_url: {
                                    url: 'https://graphon.up.railway.app/api/auth/telegram/callback',
                                },
                            },
                        ],
                    ],
                },
            });
        });
    }
    sendMessage(chatId, message) {
        this.bot.sendMessage(chatId, message);
    }
};
exports.TelegramBotService = TelegramBotService;
exports.TelegramBotService = TelegramBotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TelegramBotService);
//# sourceMappingURL=telegram.service.js.map