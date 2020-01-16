const savePost = (newPost) => {
    $.ajax({
        url: 'https://blog-6g.firebaseio.com/team3/blogEntries.json',
        method: 'POST',
        data: JSON.stringify(newPost),
        success: response => {
            console.log(response)
            printPosts()
        }
    })
}

$(document).on('click', '#saveChanges', event => {
    let content = $('#content').val()
    let date = $('#date').val()
    let imgUrl = $('#imgUrl').val()
    let title = $('#title').val()
    let newPost = { content, date, imgUrl, title }
    savePost(newPost)
    $('#content,#date,#imgUrl,#title').val('')
})

const printPosts = () => {
    let postsCollection = {}
    $('#blog-cards').empty()
    $.ajax({
        url: 'https://blog-6g.firebaseio.com/team3/blogEntries.json',
        method: 'GET',
        success: response => {
            postsCollection = response
            $.each(postsCollection, (key, value) => {
                $('#blog-cards').prepend(`
                <div data-post-key="${key}" class="item__preview d-flex justify-content-between">
                    <div class="left mr-3 d-flex flex-column desc">
                        <span class="category">Writing<i class="ml-2">Popular topic</i></span>
                        <h2 class="title__item">${value.title}</h2>
                        <span class="description">${value.content}</span>
                        <div class="d-flex justify-content-between">
                            <div class=" mt-3 mr-2 ellipsis">
                                <p class="ellipsis"><span class="autor"></span>Tim Dimming in<span
                                        class="group"> Better Marketing
                                    </span></p>
                                <p class="ellipsis">
                                    <span class="timeago">${value.date}</span> .
                                    <span class="read">10 min read</span>
                                    <span class="icon-star1 "></span>
                                </p>


                            </div>
                            <div class="mt-3 ml-2">
                                <span class="icon-bookmark-o"></span>
                                <span class="icon-navigation-more d-none d-md-inline-block"></span>
                            </div>
                        </div>
                    </div>
                    <div class="item__image d-flex img__post">
                        <img src="${value.imgUrl}"
                            alt="">
                    </div>
                </div>
                `)
            })
        }
    })
}

printPosts()