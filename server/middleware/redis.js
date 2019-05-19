const Redis = require('ioredis')

class Store{
    constructor({
        port= 6379,          // Redis port
        host= '127.0.0.1',   // Redis host
        family= 4,           // 4 (IPv4) or 6 (IPv6)
        password= '',
        db= 0
    } = {}){
        this.redis = new Redis({
            port,
            host,
            family,
            password,
            db
          })
    }
    async get(key){
        return await this.redis.get(key);
    }
    async set(key,value,{ maxAge = 1000000 } = {}){
        return await this.redis.set(key, JSON.stringify(session), 'EX', maxAge / 1000);
    }
    async destroy(key) {
        return await this.redis.del(key);
    }
}

module.exports = ()=>{
    const store = new Store();
    return async (ctx,next)=>{
        ctx.store = store;
        await next();
    }
}

