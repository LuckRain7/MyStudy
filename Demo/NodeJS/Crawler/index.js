const pt = require('puppeteer')

    ; (async () => {
        const browser = await pt.launch()

        const fields = [
            {
                sourceId: '-1',
                mark: '全部'
            },
            {
                sourceId: '2',
                mark: '大陆'
            },
            {
                sourceId: '3',
                mark: '美国'
            },
            {
                sourceId: '6',
                mark: '日本'
            },
            {
                sourceId: '10',
                mark: '中国香港'
            },
        ]

        let datas = {}

        for (let i = 0; i < fields.length; i++) {
            let info = fields[i],
                url = `https://maoyan.com/films?sourceId=${info.sourceId}`,
                id = info.sourceId,
                page = await browser.newPage();

            await page.goto(url, {
                waitUntil: 'networkidle2'
            })

            // 为页面注入脚本
            const result = await page.evaluate(() => {
                const $ = window.$,
                    items = $('.movie-list dd');

                let data = []

                items.each((index, item) => {
                    let elem = $(item)
                    let sub = {
                        href: elem.find('a').eq(0).prop('href'),
                        poster: elem.find('img').eq(1).prop('data-src'),
                        title: elem.find('.movie-item-title').prop('title'),
                        integer: elem.find('.integer').text(),
                        fraction: elem.find('.fraction').text(),
                    }
                    data.push(sub)
                })
                return data
            })

            datas[id] = result;
        }
        await browser.close()

        // 线程
        process.send(datas);

        setTimeout(() => {
            process.exit(0);
        }, 1000)

        console.log(datas);

    })();