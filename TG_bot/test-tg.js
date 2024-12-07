const fetch = require('node-fetch');
const https = require('https');
const HttpsProxyAgent = require('https-proxy-agent');

const BOT_TOKEN = '7955064523:AAF-gEyZyc6_p7Sdew8G5mvoi3ewfR_B8FM';
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/getMe`;

// 测试不同的 fetch 配置
async function testFetchConfigurations() {
    // 1. 基础 fetch
    try {
        console.log('\n=== Test 1: Basic fetch ===');
        const response1 = await fetch(API_URL);
        console.log('Response 1:', await response1.json());
    } catch (error) {
        console.error('Error 1:', error);
    }

    // 2. fetch with proxy agent
    try {
        console.log('\n=== Test 2: Fetch with proxy agent ===');
        const proxyAgent = new HttpsProxyAgent('http://127.0.0.1:7890');
        const response2 = await fetch(API_URL, {
            agent: proxyAgent,
            timeout: 30000
        });
        console.log('Response 2:', await response2.json());
    } catch (error) {
        console.error('Error 2:', error);
    }

    // 3. fetch with custom https agent
    try {
        console.log('\n=== Test 3: Fetch with custom https agent ===');
        const agent = new https.Agent({
            keepAlive: true,
            keepAliveMsecs: 1000,
            maxSockets: 256,
            maxFreeSockets: 256,
            timeout: 30000,
            proxy: 'http://127.0.0.1:7890'
        });
        const response3 = await fetch(API_URL, { agent });
        console.log('Response 3:', await response3.json());
    } catch (error) {
        console.error('Error 3:', error);
    }

    // 4. fetch with all options
    try {
        console.log('\n=== Test 4: Fetch with all options ===');
        const proxyAgent = new HttpsProxyAgent('http://127.0.0.1:7890');
        const response4 = await fetch(API_URL, {
            agent: proxyAgent,
            timeout: 30000,
            headers: {
                'User-Agent': 'Node.js Test Client',
                'Accept': 'application/json'
            },
            follow: 20,
            compress: true,
            size: 0
        });
        console.log('Response 4:', await response4.json());
    } catch (error) {
        console.error('Error 4:', error);
    }
}

// 运行测试
console.log('Starting node-fetch tests...');
console.log('Node version:', process.version);
console.log('node-fetch version:', require('node-fetch/package.json').version);

testFetchConfigurations().catch(console.error);