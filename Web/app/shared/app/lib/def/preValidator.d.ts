///<reference path='./defLoader.d.ts'/>

declare class PreValidator{
    static checkLogin(str: String): Message;
    static checkPassword(str: String): Message;
}