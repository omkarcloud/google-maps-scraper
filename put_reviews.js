(function () {


  function parse(inputString) {
    let substringToRemove = ")]}'"

    let modifiedString = inputString 
    if (inputString.startsWith(substringToRemove)) {
      modifiedString = inputString.slice(substringToRemove.length)
    } else {
    }
    return JSON.parse(modifiedString)
  }

  function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  

  function convertTimestampToISODate(timestamp) {
    // Convert from microseconds to milliseconds
    const milliseconds = timestamp / 1000
    // Create a new Date object
    const date = new Date(milliseconds)
    // Return the date in the specified format
    return date.toISOString()
  }
  function toTitleCase(str) {
    if (typeof str !== 'string' || str === null) {
      return null
    }

    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      }
    )
  }

  function get_images(data) {
    let images =
      data?.[0]?.[2]?.[2] ?? []

    const ls = []
    for (let index = 0; index < images.length; index++) {
      const element = images[index]

      const source = element[1][6][0]
      return source
    }

    return ls
  }

  function get_reviews(data) {
    let rs =
      data?.[2] ?? []
    const ls = []
    for (let index = 0; index < rs.length; index++) {
      const element = rs[index]

      try {

        // Data Most likely user want to see
        const reviewer_name = toTitleCase(element[0][1][4][0][4]) // Name of the reviewer
        const review_rating = element[0][2][0][0] // 5
        const review_text = element[0][2][1]?.[0] // Honest and Accurate weighing machine in All Palwal
        const published_ago = element[0][1][6] // 3 years ago
        const number_of_reviews_by_reviewer = element[0][1][4][0][1] // 6

        // Review Details
        const review_id = element[0][0] // "ChdDSUhNMG9nS0VJQ0FnSUNKMk9DcnV3RRAB"
        const published_at_date = convertTimestampToISODate(element[0][1][2]) // "2023-06-20T10:41:54.335Z"
        const review_likes_count = element[0][4][1] // 0
        const translated_text = element[0][2][1]?.[3] // Máquina de pesaje honesta y precisa en All Palwal
        const review_url = element[0][4][3][0] // "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChdDSUhNMG9nS0VJQ0FnSUNKMk9DcnV3RRAB!2m1!1s0x0:0x42d93af31bfabc52!3m1!1s2@1:CIHM0ogKEICAgICJ2OCruwE%7CCgwI8oTGpAYQoIjynwE%7C?hl=en"
        const review_images_urls = get_images(element) // []


        // Reviewer Details
        const reviewer_id = element[0][1][10] // "108680202961484374451"
        const reviewer_url = element[0][1][4][0][5] // "https://www.google.com/maps/contrib/108680202961484374451?hl=en"
        const is_local_guide = element[0][1]?.[4]?.[0]?.[0]?.[2] !== 0 // false
        const reviewer_avatar_image = element[0][1][4][0][3] // "https://lh3.googleusercontent.com/a-/ALV-UjX4YtD5aIC0d9nLgN614PNVTeWZledmSUa_6hL915ungYo=s120-c-rp-mo-br100"

        
        // Owner Response Details
        const response_from_owner_ago = element[0]?.[3]?.[1] ? timeSince(new Date(element[0][3][1] / 1000)) + " ago" : null // "2019-12-14T15:31:40.589Z"
        const response_from_owner_date = element[0]?.[3]?.[1] ? convertTimestampToISODate(element[0][3][1]) : null // "2019-12-14T15:31:40.589Z"
        const response_from_owner_text = element[0]?.[3]?.[0]?.[0] ?? null // "Thanks"




        const result = {
          reviewer_name,
          review_rating,
          review_text,
          published_at: published_ago,
          number_of_reviews_by_reviewer,

          review_id,
          published_at_date,
          review_likes_count,
          translated_text,
          review_url,
          review_images_urls,

          reviewer_id,
          reviewer_url,
          is_local_guide,
          reviewer_avatar_image,

          response_from_owner_ago,
          response_from_owner_date,
          response_from_owner_text,
        }
        ls.push(result)
      } catch (error) {
        console.log(error)
        console.log(element)
        throw error

      }
    }

    return ls
  }

  window.reviews = []
  function put_data(text) {
    let data = parse(text)
    // const data =
    let reviews = get_reviews(data)
    // console.log(reviews)
    window.reviews.push(...reviews)
  }

  var open = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = function () {
    this.addEventListener('readystatechange', function () {
      const REQUEST_DONE = 4
      if (this.readyState === REQUEST_DONE && this.responseURL.includes("/maps/rpc/listugcposts")) {
        const response = this.responseText
        put_data(response)
      }
    })
    open.apply(this, arguments)
  }
})()