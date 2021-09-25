module.exports = {
    stories: [
        "../docs/Introduction.stories.mdx",
        "../docs/Install.stories.mdx",
        "../docs/Components.stories.mdx",
        "../docs/**/*.stories.mdx",
        "../docs/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    addons: ['@storybook/addon-essentials'],
};
