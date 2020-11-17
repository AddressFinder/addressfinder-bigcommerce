import optimizedOnePageCheckout from './address_form_config/optimized_one_page_checkout'
import addressBook from './address_form_config/address_book'
import createAccount from './address_form_config/create_account'
export default class ConfigManager {

   load() {
    // This function is called when the page mutates and returns our form configurations
    const addressFormConfigurations = [
      optimizedOnePageCheckout,
      ...addressBook,
      ...createAccount
    ]

    return addressFormConfigurations
  }
}
