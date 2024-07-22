import optimizedOnePageCheckout from './address_form_config/optimized_one_page_checkout'
import addressBook from './address_form_config/address_book'
import addressBookSuffixed from './address_form_config/address_book_suffixed'
import createAccount from './address_form_config/create_account'
import createAccountSuffixed from './address_form_config/create_account_suffixed'
import createAccountShipping from './address_form_config/create_account_shipping'

export default class ConfigManager {

   load() {
    // This function is called when the page mutates and returns our form configurations
    const addressFormConfigurations = [
      optimizedOnePageCheckout,
      ...addressBook,
      ...addressBookSuffixed,
      ...createAccount,
      ...createAccountSuffixed,
      ...createAccountShipping
    ]

    return addressFormConfigurations
  }
}
