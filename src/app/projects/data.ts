export interface Project {
    slug: string;
    title: string;
    category: string;
    year: string;
    description: string;
    image?: string;
    thumbnail?: string;
    externalLink?: string;
    draft?: boolean;
    content: Array<{
        type: 'header' | 'sub-header' | 'paragraph' | 'list';
        text?: string;
        items?: string[];
    }>;
}

// ... existing projects ...



export const projects: Project[] = [
    {
        slug: "literacy-data-analysis",
        title: "Literacy Data Analysis",
        category: "Data Analysis",
        year: "2024",
        description: "Analysis of enrollment, demographics, and spending trends in Arkansas School Districts using various visualization techniques.",
        thumbnail: "/images/literacy-analysis.png",
        content: [
            { type: 'header', text: 'Overview' },
            { type: 'paragraph', text: 'This project analyzes key trends in Arkansas School Districts, focusing on enrollment size, racial demographics, per-pupil spending, and academic performance. Using various visualization techniques, we explore meaningful relationships in the data to derive actionable insights.' },

            { type: 'header', text: 'Team Members' },
            { type: 'list', items: ['Max Bassler', 'Steve Abochale', 'Evan Charles'] },

            { type: 'header', text: 'Dataset Description' },
            { type: 'paragraph', text: 'The dataset includes data from Arkansas school districts, encompassing ACT scores, racial demographics, per-pupil spending, and bus route information. Data sources include ADE My School Info, act.org and other district-level public records.' },

            { type: 'header', text: 'Questions and Insights' },

            { type: 'sub-header', text: 'Question 1: How has the gap between the Arkansas and National ACT average scores for Math and English Language Arts changed from 2017 to 2024?' },
            { type: 'paragraph', text: 'Visualization Type: Time-Series Plot' },
            { type: 'paragraph', text: 'Why this question is interesting: Understanding the performance trends in standardized testing helps evaluate the state’s progress relative to the national benchmark.' },
            { type: 'paragraph', text: 'Analysis Summary: The data reveals a steady decline in ACT Math and ELA scores for both Arkansas and the nation, with Arkansas consistently scoring below the national average.' },

            { type: 'sub-header', text: 'Question 2: How do racial demographics compare in their percentages within the school’s total enrollment in 2022-23?' },
            { type: 'paragraph', text: 'Visualization Type: Bar Chart (Fayetteville School District)' },
            { type: 'paragraph', text: 'Why this question is interesting: Racial demographics provide insights into the diversity and inclusivity of schools, influencing educational equity and representation.' },
            { type: 'paragraph', text: 'Analysis Summary: The bar chart shows that most schools in the Fayetteville district are predominantly White, with Hispanic and African American students forming notable minorities.' },

            { type: 'sub-header', text: 'Question 3: What is the distribution of per-pupil spending across schools in the district?' },
            { type: 'paragraph', text: 'Visualization Type: Histogram' },
            { type: 'paragraph', text: 'Why this question is interesting: Examining the distribution of per-pupil spending highlights potential disparities in resource allocation among schools.' },
            { type: 'paragraph', text: 'Analysis Summary: Most schools spend between $11,172.72 and $15,068.43 per pupil, with fewer schools at the spending extremes.' },

            { type: 'sub-header', text: 'Question 4: How does total enrollment size affect the number of bus routes in each district?' },
            { type: 'paragraph', text: 'Visualization Type: Scatter Plot' },
            { type: 'paragraph', text: 'Why this question is interesting: Exploring the relationship between enrollment size and bus routes helps optimize transportation logistics and resource planning.' },
            { type: 'paragraph', text: 'Analysis Summary: Higher enrollment correlates with more bus routes, as seen in a strong positive relationship.' },

            { type: 'header', text: 'Conclusion' },
            { type: 'paragraph', text: 'This project highlights trends across Arkansas School Districts, including ACT score performance, diversity within schools, spending disparities, and the relationship between enrollment and transportation resources. These findings provide insights that can guide future decision-making and policy development.' },

            { type: 'header', text: 'Credits' },
            {
                type: 'list', items: [
                    'Dataset Source: ADE My School Info, act.org',
                    'Tools Used: Microsoft Excel, Quarto Markdown, and Powerpoint'
                ]
            }
        ]
    },
    {
        slug: "housing-cluster-analysis",
        title: "Housing Cluster Analysis",
        category: "Web App",
        year: "2024",
        description: "Interactive property discovery tool using Vaadin, SMILE clustering, and Google Maps API for the US housing market.",
        image: "/images/housing-cluster.png",
        thumbnail: "/images/housing-cluster-thumb.png",
        content: [
            { type: 'header', text: 'Introduction' },
            { type: 'paragraph', text: 'The objective of our “Pillow” project is to give users a simple, attractive web tool for discovering and comparing properties across the southern and southeastern United States. Using Vaadin Components for the UI, SMILE for clustering, Google Maps API for browser map display, and custom CSS styling, we built an interactive site where anyone can:' },
            {
                type: 'list', items: [
                    'Search by city or neighborhood',
                    'See summary analytics at each geographical level',
                    'Look into individual listings'
                ]
            },
            { type: 'paragraph', text: 'Whether you’re a home buyer or an analyst, Pillow puts property exploration at your fingertips.' },

            { type: 'header', text: 'Design' },
            { type: 'sub-header', text: 'Vaadin Flow' },
            { type: 'paragraph', text: 'Provides <Select> dropdowns, <Grid> tables, and layout containers (VerticalLayout, HorizontalLayout).' },
            { type: 'sub-header', text: 'GoogleMap Add‑On' },
            { type: 'paragraph', text: 'Embeds an interactive U.S. map; markers focus on the chosen city or neighborhood.' },
            { type: 'sub-header', text: 'Grid & Dropdowns' },
            { type: 'paragraph', text: 'Main City Cluster and Neighborhood Sub‑Cluster selectors drive both the map and the data grid.' },
            { type: 'sub-header', text: 'Metric Cards' },
            { type: 'paragraph', text: 'Icon + Span combinations display count, mean, median, standard deviation and $/sqft in a clear, card‑style layout.' },
            { type: 'sub-header', text: 'CSS via getStyle()' },
            { type: 'paragraph', text: 'Custom backgrounds, borders, spacing, centering and sizing ensure a clean, pastel‑tinged look.' },

            { type: 'header', text: 'Functionalities' },
            { type: 'sub-header', text: 'CSV Loader (CsvService)' },
            { type: 'paragraph', text: 'Reads every property’s details: address, price, beds, baths, sqft, HOA, URL, latitude & longitude.' },
            { type: 'sub-header', text: 'Clustering Engine (clusterKMeans)' },
            { type: 'paragraph', text: 'Partitions into ~16 city clusters; on demand creates up to 11 neighborhood sub‑clusters.' },
            { type: 'sub-header', text: 'Metrics Computation (PriceStats)' },
            { type: 'paragraph', text: 'Calculates count, mean, median, variance (σ) and price‑per‑sqft for each cluster.' },
            { type: 'sub-header', text: 'Marker Management' },
            { type: 'paragraph', text: 'Batches addition/removal of GoogleMapMarkers so only the selected cluster’s points show.' },
            { type: 'sub-header', text: 'Detail Formatter' },
            { type: 'paragraph', text: 'When a grid row is clicked, centers & zooms the map and shows a styled detail panel of that property.' },

            { type: 'header', text: 'User Guide' },
            {
                type: 'list', items: [
                    '1. Navigate: Use the top menu to go to Full Map or Cluster Analysis.',
                    '2. Select Main City Cluster: Pick a city from the first dropdown. The stats card updates (count, mean price, mean $/sqft, σ) and markers appear on the map. The data grid lists every property in that cluster.',
                    '3. Select Neighborhood Sub‑Cluster: Activate the second dropdown once the city loads. Choose a neighborhood sub‑cluster to refine the map, stats card, and grid.',
                    '4. Inspect a Property: Click any row in the grid. The map recenters and zooms to that property. A detail box displays all attributes (address, price, beds/baths, neighborhood, sqft, year built, $/sqft, HOA, URL, coordinates).'
                ]
            },

            { type: 'header', text: 'What I Learned' },
            { type: 'sub-header', text: 'Embrace Pivoting' },
            { type: 'paragraph', text: 'Ambitious ideas often need adjustment, whether tuning K values, reworking layouts, or handling API issues.' },
            { type: 'sub-header', text: 'Google Maps API' },
            { type: 'paragraph', text: 'Integrating the map taught us about key restrictions, JS callbacks, and efficient marker updates.' },
            { type: 'sub-header', text: 'Vaadin Styling' },
            { type: 'paragraph', text: 'Using getStyle(), Flex layouts, and icon cards gave us control over spacing, colors, and responsiveness.' },
            { type: 'sub-header', text: 'Iterative Design' },
            { type: 'paragraph', text: 'Each new requirement (bold labels, scrollable tables, mobile resizing) reinforced the value of refactoring and testing.' }
        ]
    },
    {
        slug: "razorbook-reach",
        title: "Razorbook Reach",
        category: "Leadership & Non-Profit",
        year: "2023 - Present",
        description: "Founded an organization to promote literacy in underserved communities by organizing book donations and initiatives.",
        thumbnail: "/images/razorbook-reach.jpg",
        externalLink: "https://basssler.github.io/razorbook-me/",
        content: [
            { type: 'header', text: 'Mission' },
            { type: 'paragraph', text: 'Founded and led an organization to promote literacy in underserved communities by organizing book donations and reading initiatives. Engaged in community outreach, securing partnerships to support low-income students\' access to educational resources.' },
            { type: 'header', text: 'Impact' },
            { type: 'paragraph', text: 'Directed reading and literacy initiatives in underserved communities, organizing donation drives and educational events.' }
        ]
    }
];
