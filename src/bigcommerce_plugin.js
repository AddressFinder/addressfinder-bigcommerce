import "core-js/fn/symbol" // see https://github.com/zloirock/core-js
import "core-js/fn/symbol/iterator"
import "core-js/fn/array/find"
import "core-js/fn/array/from"
import "core-js/fn/array/includes"
import "core-js/fn/string/includes"
import MutationHelper from "./mutation_helper"

import optimizedOnePageCheckout from './layout_config/optimized_one_page_checkout'
import onePageCheckout from './layout_config/one_page_checkout'
import addressBook from './layout_config/address_book'
import createAccount from './layout_config/create_account'

export default class BigCommercePlugin {
  constructor(widgetConfig){
    this.version = "1.3.0"
    this.widgetConfig = widgetConfig
    this.layoutConfigurations = [
      optimizedOnePageCheckout,
      ...onePageCheckout,
      ...addressBook,
      ...createAccount
    ]
    new MutationHelper(this.layoutConfigurations, this.widgetConfig)
  }
}