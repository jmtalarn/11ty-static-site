---js
{   
    tags: "cosmicdata",
    pagination: {
        data: "cosmic.data",
        size: 1,
        alias: "bucket",
        addAllPagesToCollections: true,
        before: function(data) {
                    const ctas = data
                        .filter((bucket) => bucket.type_slug === "cta")
                        .reduce(
                            (acc, curr) => {
                                acc[ curr._id ] = {
                                    title: curr.title,
                                    url: curr.metafields.filter(meta => meta.key === "url").shift().value
                                };
                                return acc;
                            }, {});
                    return data
                            .filter((bucket) => bucket.type_slug === "sections")
                            //.map(bucket=>{console.log(bucket); return bucket;})
                            .map((bucket) => {
                                const ctaId = bucket.metafields.filter(meta => meta.object_type === 'cta').shift().value;
                                const cta = ctas[ ctaId ];

                                const colors = bucket.metafields.filter(meta => (meta.key === 'primarycolor' ||meta.key === 'secondarycolor') ).reduce((acc,curr)=>{ acc[curr.key]=curr.value; return acc;}, {})

                                return (
                                        {
                                            content: bucket.content,
                                            slug: bucket.slug,
                                            title: bucket.title,
                                            order: bucket.order,
                                            colors,
                                            cta
                                        }
                                    );
                            }
                        )
                        .sort((a, b) => b.order - a.order);
                }
            
    },
    permalink: "{{bucket.slug}}/",
    layout: "layout.njk"
}
---
