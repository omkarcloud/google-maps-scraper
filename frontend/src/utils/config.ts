const env = process.env.NODE_ENV

const Config = {
  IS_DEV: env == 'development',
}

export default Config
