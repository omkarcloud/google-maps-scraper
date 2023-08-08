function parse() {
  let inputString = window.APP_INITIALIZATION_STATE[3][6]
  let substringToRemove = ")]}'"

  let modifiedString
  if (inputString.startsWith(substringToRemove)) {
    modifiedString = inputString.slice(substringToRemove.length)
  } else {
  }
  return JSON.parse(modifiedString)
}

function get_categories(data) {
  return data?.[6]?.[13]
}

function get_thumbnail(data) {
  return data?.[6]?.[72]?.[0]?.[1]?.[6]?.[0]
}

function get_place_id(data) {
  return data?.[6]?.[78]
}

function get_description(data) {
  return data?.[6]?.[32]?.[1]?.[1]
}

function get_open_state(data) {
  return data?.[6]?.[34]?.[4]?.[4]
}

function get_plus_code(data) {
  return data?.[6]?.[183]?.[2]?.[2]?.[0]
}

function get_gps_coordinates(data) {
  return { latitude: data?.[6]?.[9]?.[2], longitude: data?.[6]?.[9]?.[3] }
}

function get_images(data) {
  let images = data?.[6]?.[171]?.[0] ?? []
  const ls = []
  for (let index = 0; index < images.length; index++) {
    const element = images[index]

    const title = element[2]
    const thumbnail = element[3]?.[0]?.[6]?.[0]
    if (thumbnail) {
      const result = {
        title: title,
        thumbnail: thumbnail,
      }
      ls.push(result)
    }
  }
  return ls
}

function get_reservations(data) {
  let images = data?.[6]?.[46] ?? []
  const ls = []
  for (let index = 0; index < images.length; index++) {
    const element = images[index]

    const link = element[0]
    const source = element[1]

    const result = {
      link,
      source,
    }
    ls.push(result)
  }
  return ls
}

function get_order_online_link(data) {
  let images =
    data?.[6]?.[75]?.[0]?.[1]?.[2] ?? data?.[6]?.[75]?.[0]?.[0]?.[2] ?? []
  const ls = []
  for (let index = 0; index < images.length; index++) {
    const element = images[index]

    const source = element[0][0]
    const link = element[1][2][0]

    const result = {
      link,
      source,
    }
    ls.push(result)
  }

  return ls
}

function get_hours(data) {
  let images = data?.[6]?.[34]?.[1] ?? []
  const ls = []
  for (let index = 0; index < images.length; index++) {
    const element = images[index]

    const day = element[0]
    const times = element[1]

    const result = {
      day,
      times,
    }
    ls.push(result)
  }
  return ls
}

function get_options(data) {
  return data.map((x) => {
    const enabled = x[2]?.[1]?.[0]?.[0] ?? x[4]?.[0]

    return {
      name: x[1],
      enabled: enabled != 0,
    }
  })
}

function get_about(data) {
  let rvs = data?.[6]?.[100]?.[1] ?? []
  const ls = []

  for (let index = 0; index < rvs.length; index++) {
    const element = rvs[index]

    const id = element[0]
    const name = element[1]

    const options = get_options(element[2] ?? [])

    const result = {
      id,
      name,
      options,
    }
    ls.push(result)
  }
  return ls
}

function get_menu(data) {
  const link = data?.[6]?.[38]?.[0]
  const source = data?.[6]?.[38]?.[1]

  const result = {
    link,
    source,
  }
  return result
}

function get_review_images(data) {
  return data.map((x) => x[6][0])
}

function get_user_reviews(data) {
  let rvs = data?.[6]?.[52]?.[0] ?? []
  const ls = []

  for (let index = 0; index < rvs.length; index++) {
    const element = rvs[index]

    const name = element[0][1]
    const profile_picture = element[0][2]
    const when = element[1]
    const rating = element[4]
    const description = element[3]

    const images = get_review_images(element[14] ?? [])

    const result = {
      name,
      profile_picture,
      rating,
      description,
      images,
      when,
    }
    ls.push(result)
  }
  return ls
}

function get_owner(data) {
  const name = data?.[6]?.[57]?.[1]
  const id = data?.[6]?.[57]?.[2]
  const link = "https://www.google.com/maps/contrib/" + id

  if (!id) {
    return {
      name,
    }
  }

  const result = {
    id,
    name,
    link,
  }
  return result
}

function get_complete_address(data) {
  const borough = data?.[6]?.[183]?.[1]?.[0]
  const street = data?.[6]?.[183]?.[1]?.[1]
  const city = data?.[6]?.[183]?.[1]?.[3]
  const postal_code = data?.[6]?.[183]?.[1]?.[4]
  const state = data?.[6]?.[183]?.[1]?.[5]
  const country_code = data?.[6]?.[183]?.[1]?.[6]

  const result = {
    borough,
    street,
    city,
    postal_code,
    state,
    country_code,
  }
  return result
}

function get_time_zone(data) {
  return data?.[6]?.[30]
}

function get_reviews_link(data) {
  return data?.[6]?.[4]?.[3]?.[0]
}

function get_rating(data) {
  return data?.[6]?.[4]?.[7]
}

function get_reviews(data) {
  return data?.[6]?.[4]?.[8]
}

function get_phone(data) {
  return data?.[6]?.[178]?.[0]?.[0]
}

function get_price_range(data) {
  return data?.[6]?.[4]?.[2]
}

function get_title(data) {
  return data?.[6]?.[11]
}

function get_address(data) {
  return data?.[6]?.[18]
}

function get_website(data) {
  return data?.[6]?.[7]?.[0]
}

function get_main_category(data) {
  return data?.[6]?.[13]?.[0]
}

function get_cid(data) {
  return data?.[25]?.[3]?.[0]?.[13]?.[0]?.[0]?.[1]
}

function get_data_id(data) {
  return data?.[6]?.[10]
}

function get_reviews_per_rating(data) {
  return {
    1: data?.[6]?.[52]?.[3]?.[0],
    2: data?.[6]?.[52]?.[3]?.[1],
    3: data?.[6]?.[52]?.[3]?.[2],
    4: data?.[6]?.[52]?.[3]?.[3],
    5: data?.[6]?.[52]?.[3]?.[4],
  }
}

function get_more_data() {
  let data = parse()

  let categories = get_categories(data)
  let place_id = get_place_id(data)

  let order_online_links = get_order_online_link(data)

  let thumbnail = get_thumbnail(data)
  let coordinates = get_gps_coordinates(data)

  let images = get_images(data)

  let description = get_description(data)

  let status = get_open_state(data)

  let plus_code = get_plus_code(data)

  let reservations = get_reservations(data)

  let menu = get_menu(data)

  let owner = get_owner(data)

  let time_zone = get_time_zone(data)

  let complete_address = get_complete_address(data)

  let reviews_link = get_reviews_link(data)
  let price_range = get_price_range(data)
  let reviews_per_rating = get_reviews_per_rating(data)

  let cid = get_cid(data)
  let data_id = get_data_id(data)

  let about = get_about(data)

  let hours = get_hours(data)

  let rating = get_rating(data)
  let reviews = get_reviews(data)

  let phone = get_phone(data)

  let title = get_title(data)
  let address = get_address(data)
  let website = get_website(data)
  let main_category = get_main_category(data)
  let user_reviews = get_user_reviews(data)

  // Add more
  // skipped questions_and_answers
  // popular_times
  // peolple also search for

  return {
    place_id,
    title,
    rating,
    reviews,
    status,
    price_range,
    website,
    phone,

    description,
    address,
    reviews_per_rating,
    reviews_link,
    thumbnail,
    images,
    hours,

    menu,
    order_online_links,
    reservations,

    owner,

    main_category,
    categories,

    coordinates,
    plus_code,

    complete_address,
    time_zone,

    about,
    user_reviews,
    cid,
    data_id,
  }
}

// console.log(get_more_data())

return get_more_data()
