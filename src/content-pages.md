---js
{   

    pagination: {
        data: "cosmic.data.bucket.objects",
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
                            order: bucket.order,
                            data: {
                                eleventyNavigation: {
                                    key: bucket.slug,
                                    title: bucket.title,
                                    order: bucket.order,
                                    url: `/${bucket.slug}/`
                   
                                }
                            }
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
