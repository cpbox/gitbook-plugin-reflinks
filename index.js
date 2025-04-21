const fs = require('fs');
const path = require('path');

let currentPagePath = '';

module.exports = {
    website: {
        js: [
            'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
        ],
    },
    hooks: {
        "page:before": function(page) {
            // 保存当前页面路径
            currentPagePath = page.path;
            // 在页面处理之前，将 content-ref 转换为 reflinks
            page.content = page.content.replace(/{%\s*content-ref\s*(.*?)%}([\s\S]*?){%\s*endcontent-ref\s*%}/g, function(match, args, content) {
                return `{% reflinks ${args} %}${content}{% endreflinks %}`;
            });
            return page;
        }
    },
    blocks: {
        "reflinks": {
            process: function(block) {
                const href = block.kwargs.href || block.kwargs.url || '';
                let text = block.body || '';
                // 如果是本地 md 文件，尝试读取标题
                if (href.endsWith('.md')) {
                    try {
                        // 获取当前页面的目录
                        const currentPageDir = path.dirname(currentPagePath);
                        const filePath = path.join(process.cwd(), currentPageDir, href);
                        if (fs.existsSync(filePath)) {
                            const content = fs.readFileSync(filePath, 'utf8');
                            const titleMatch = content.match(/^#\s+(.*)$/m);
                            if (titleMatch) {
                                text = titleMatch[1].trim();
                            }
                        } else {
                            console.log('文件不存在', filePath);
                        }

                    } catch (e) {
                        console.error('Error reading md file:', e);
                    }
                }
                
                return `<a class="group w-[calc(100%-2px)] mx-auto flex flex-row justify-between items-center gap-4 ring-1 ring-gray-300 rounded straight-corners:rounded-none px-[20px] py-[12px] transition-shadow hover:ring-primary-hover decoration-primary/6 page-api-block:ml-0" href="${href}">
                    <span class="flex flex-col flex-1">
                        <span class="text-base transition-colors group-hover:text-primary">${text.trim()}</span>
                    </span>
                    <svg class="gb-icon size-[12px] bg-gray-400 transition-all group-hover:translate-x-0.5 group-hover:text-primary" style="mask-image: url('https://ka-p.fontawesome.com/releases/v6.6.0/svgs/light/chevron-right.svg?v=2&token=a463935e93'); mask-repeat: no-repeat; mask-position: center center;"></svg>
                </a>`;
            },
            ends: true
        }
    }
}; 