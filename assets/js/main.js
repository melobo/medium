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
    let postsKeys = []
    let lastPost = {}
    $('#blog-cards').empty()
    $('#blog-main').empty()
    $.ajax({
        url: 'https://blog-6g.firebaseio.com/team3/blogEntries.json',
        method: 'GET',
        success: response => {
            postsCollection = response
            postsKeys = Object.keys(postsCollection)
            lastPost = postsCollection[postsKeys[postsKeys.length - 1]]
            delete postsCollection[postsKeys[postsKeys.length - 1]]
            $('#blog-main').append(`
            <div class=" d-flex justify-content-between  flex-column item__preview hero__item hero__left">
                <div class="item__image d-flex img__post">
                    <img src="${lastPost.imgUrl}"
                        alt="">
                </div>
                <div class="left d-flex flex-column desc mt-2">
                    <h2 class="title__item">${lastPost.title}</h2>
                    <p class="description">${lastPost.content}</p>
                    <div class="d-flex justify-content-between">
                        <div class=" mt-3 mr-2 ellipsis">
                            <p class="ellipsis"><span class="autor">Javascript Jeep</span> in <span
                                    class="group">Better
                                    Programming</span></p>
                            <p class="ellipsis">
                                <span class="timeago">${lastPost.date}</span> .
                                <span class="read">2 min read</span>
                                <span class="icon-star1 "></span>
                            </p>

                        </div>
                    </div>
                </div>

            </div>
            `)
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