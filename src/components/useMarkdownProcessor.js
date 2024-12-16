import { useCallback } from 'react';
import { remark } from 'remark';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypePrismAll from 'rehype-prism-plus';
import remarkGfm from "remark-gfm";
import rehypeStringify from 'rehype-stringify';
import "prismjs/themes/prism.css";
// import 'prismjs/components/prism-python';

const useMarkdownParser = () => {
    const parseMarkdown = useCallback(async (markdownArray) => {
        const parsedHtmlArray = await Promise.all(
            markdownArray.map(async (markdown) => {
                const processedHtml = await remark()
                    .use(remarkGfm)
                    .use(remarkMath)
                    .use(remarkRehype)
                    .use(rehypeKatex)
                    .use(rehypePrismAll)
                    .use(rehypeStringify)
                    .process(markdown);

                return processedHtml.toString();
            })
        );

        return parsedHtmlArray;
    }, []);

    return parseMarkdown;
};

export default useMarkdownParser;