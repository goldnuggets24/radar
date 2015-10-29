require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Radar
  class Application < Rails::Application

    config.react.variant      = :production
    config.react.addons       = true

    config.assets.enabled = true
    config.assets.paths << Rails.root.join('node_modules')
    config.assets.paths << Rails.root.join('bower_components')
    config.assets.paths << Rails.root.join('/app/assets/javascripts')

    config.browserify_rails.paths << '/lib/assets/javascripts/'
    config.browserify_rails.evaluate_node_modules = false
    config.browserify_rails.force = false
    config.browserify_rails.commandline_options = '-t [ babelify --stage 0 ] -t coffee-reactify -t require-globify --fast'

    config.generators do |g|
      g.test_framework :rspec,
        fixtures: true,
        view_specs: false,
        helper_specs: false,
        routing_specs: false,
        controller_specs: false,
        request_specs: false
      g.fixture_replacement :factory_girl, dir: "spec/factories"
    end

    module RailsAndReact
        class Application < Rails::Application
            config.react.variant      = :production
            config.react.addons       = true
            config.assets.enabled = true
            config.assets.paths << Rails.root.join('node_modules')
            config.assets.paths << Rails.root.join('bower_components')
            config.assets.paths << Rails.root.join('/app/assets/javascripts')

            config.browserify_rails.paths << '/lib/assets/javascripts/'
            config.browserify_rails.evaluate_node_modules = false
            config.browserify_rails.force = false
            config.browserify_rails.commandline_options = '-t [ babelify --stage 0 ] -t coffee-reactify -t require-globify --fast'
    # ...
    # React config
            config.react.addons = true
        end
    end

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true
  end
end
