export default class ConfigManager {
  constructor(staticAddressFormConfigurations) {
    this.staticAddressFormConfigurations = staticAddressFormConfigurations
  }

   load() {
    // This function is called when the page mutates and returns our form configurations
    const addressFormConfigurations = this.staticAddressFormConfigurations

    return addressFormConfigurations
  }
}