import config from './config.js'
import utils from './utils.js'
import api from './api.js'
import auth from './auth.js'
import storage from './storage.js'
import router from './router.js'
import theme from './theme.js'
import logger from './logger.js'
import constants from './constants.js'
import i18n from './i18n.js'
import validator from './validator.js'
import hooks from './hooks.js'
import helpers from './helpers.js'
import env from './env.js'
import cache from './cache.js'
import layout from './layout.js'
import permissions from './permissions.js'
import session from './session.js'
import analytics from './analytics.js'
import user from './user.js'

// Initialize app
config.load()
logger.init()
theme.applyDefault()

// Setup global helpers
utils.init()
hooks.registerGlobalHooks()

// Validate environment
if (!validator.validateEnv(env)) {
  logger.error('Invalid environment config.js')
}

// Restore session
session.restore()

// Setup routing
router.init()
layout.renderMainLayout()

// Fetch user profile
api.get('/user/profile.js').then(profile => {
  user.setProfile(profile)
  permissions.apply(profile.roles)
})

// Enable tracking
analytics.init()

// Load language settings
i18n.load(config.defaultLanguage)
