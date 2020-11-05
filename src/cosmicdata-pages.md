---js
{   
    tags: "cosmicdata",
    pagination: {
        data: "cosmic.data",
        size: 1,
        alias: "bucket",
        addAllPagesToCollections: true,
        before: function(data){
           return data
                .filter((bucket) => bucket.type_slug === "sections")
                //.map(bucket=>{console.log(bucket); return bucket;})
                .map((bucket) => (
                        {
                            content: bucket.content,
                            slug: bucket.slug,
                            title: bucket.title,
                            order: bucket.order
                        }
                    )
                )
                .sort((a,b)=>b.order-a.order);
            }
            
    },
    permalink: "{{bucket.slug}}/",
    layout: "layout.njk"
}
---
