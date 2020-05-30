module.exports = {
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `react-beautiful-dnd sample`,
        short_name: `react-beautiful-dnd sample`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `assets/images/favicon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
};
