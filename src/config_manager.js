import optimizedOnePageCheckout from './address_form_config/optimized_one_page_checkout'
import addressBook from './address_form_config/address_book'
import addressBookV2 from './address_form_config/address_book_v2'
import createAccount from './address_form_config/create_account'
import createAccountV2 from './address_form_config/create_account_v2'
export default class ConfigManager {

   load() {
    // This function is called when the page mutates and returns our form configurations
    const addressFormConfigurations = [
      optimizedOnePageCheckout,
      ...addressBook,
      ...addressBookV2,
      ...createAccount,
      ...createAccountV2
    ]

    return addressFormConfigurations
  }
}
