import optimizedOnePageCheckout from './address_form_config/optimized_one_page_checkout'
import optimizedOnePageCheckoutEmailGuest from './email_form_config/optimized_one_page_checkout_guest'
import optimizedOnePageCheckoutEmailCreate from './email_form_config/optimized_one_page_checkout_create'
import createAccountEmail from './email_form_config/create_account'
import createAccountEmailSuffix from './email_form_config/create_account_suffix'
import optimizedOnePageCheckoutBillingPhone from './phone_form_config/optimized_one_page_checkout_billing'
import optimizedOnePageCheckoutPhoneShipping from './phone_form_config/optimized_one_page_checkout_shipping'
import createAccountPhone from './phone_form_config/create_account'
import createAccountPhoneSuffix from './phone_form_config/create_account_suffix'
import EditAccountPhone from './phone_form_config/edit_account'
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

  loadEmailConfigurations() {
    const emailFormConfigurations = [
      optimizedOnePageCheckoutEmailGuest,
      optimizedOnePageCheckoutEmailCreate,
      createAccountEmail,
      createAccountEmailSuffix
    ]

    return emailFormConfigurations
  }

  loadPhoneConfigurations() {
    const phoneFormConfigurations = [
      optimizedOnePageCheckoutBillingPhone,
      optimizedOnePageCheckoutPhoneShipping,
      createAccountPhone,
      createAccountPhoneSuffix,
      EditAccountPhone
    ]

    return phoneFormConfigurations
  }
}
