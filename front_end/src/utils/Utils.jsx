export const handleRenderCurrentSelectAddress = (addressSelector, format) => {
  if (addressSelector) {
    const { address, selectAddress } = addressSelector;
    const { provinceCity, district, ward } = selectAddress;
    const provinceCitySelected = address[provinceCity];
    const districtSelected = provinceCitySelected.district[district];
    const wardSelected = districtSelected.ward[ward];
    if (format) {
      return `${wardSelected.name}, ${districtSelected.name}, ${provinceCitySelected.name}`;
    } else {
      return `${wardSelected.name} - ${districtSelected.name} - ${provinceCitySelected.name}`;
    }
  } else {
    return "";
  }
};

export const handleTakeIdFromSelectAddress = (addressSelector) => {
  if (addressSelector) {
    const { address, selectAddress } = addressSelector;
    const { provinceCity, district, ward } = selectAddress;
    const provinceCitySelected = address[provinceCity];
    const districtSelected = provinceCitySelected.district[district];
    const wardSelected = districtSelected.ward[ward];
    return {
      provinceCityId: provinceCitySelected.id,
      districtId: districtSelected.id,
      wardId: wardSelected.id,
    };
  } else {
    return null;
  }
};

export const handleRenderBusiness = (business) => {
  let result = "";
  if (business) {
    let childBusiness = business;
    let subBusiness = childBusiness.business[0];
    result = `${subBusiness.name} > ${childBusiness.name}`;
    if (subBusiness.business.length !== 0) {
      let parentBusiness = subBusiness.business[0];
      result = `${parentBusiness.name} > ${subBusiness.name} > ${childBusiness.name}`;
    }
  }

  return result;
};

export const getMinPrice = (product) => {
  if (product) {
    const { productOptions } = product;
    return Math.min(
      ...productOptions.map((productOption) => productOption.price)
    );
  } else {
    return 0;
  }
};

export const getMaxPrice = (product) => {
  if (product) {
    const { productOptions } = product;
    return Math.max(
      ...productOptions.map((productOption) => productOption.price)
    );
  } else {
    return 0;
  }
};

export const renderAddress = (address) => {
  let result = "";
  if (address) {
    const { provinceCity, district, ward } = address;
    result = `${ward.name}, ${district.name}, ${provinceCity.name}`;
  }

  return result;
};

export const getProductOptionById = (product, productOptionId) => {
  if (product) {
    const { productOptions } = product;
    let productOption = productOptions.find((e) => e.id == productOptionId);
    return productOption;
  }
};

export const handleRenderUserAddress = (userAddress) => {
  if (userAddress) {
    const { streetDetail, provinceCity, district, ward } = userAddress;
    return `${streetDetail} - ${ward.name} - ${district.name} - ${provinceCity.name}`;
  }
};
