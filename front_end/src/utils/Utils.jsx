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

export const handleTakeIndexFromUserAddress = (
  userAddress,
  addressSelector
) => {
  if ((userAddress, addressSelector)) {
    const { provinceCity, district, ward } = userAddress;
    const { address } = addressSelector;
    let provincityIndex = address.findIndex((e) => e.id === provinceCity.id);
    let currentDistrict = address[provincityIndex].district;
    let districtIndex = currentDistrict.findIndex((e) => e.id === district.id);
    let currentWard = currentDistrict[districtIndex].ward;
    let wardIndex = currentWard.findIndex((e) => e.id === ward.id);
    return {
      provinceCity: provincityIndex,
      district: districtIndex,
      ward: wardIndex,
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

export const getAvatar = (product) => {
  if (product) {
    const { assets } = product;
    let assetList = sortByIdASC(assets);
    let assetAvatar = assetList.find((e) => e.assetType === "image");
    return assetAvatar.url;
  } else {
    return "";
  }
};

export const sortAssetsProduct = (assets) => {
  if (assets && Array.isArray(assets)) {
    let imgArr = assets.filter((e) => e.assetType === "image");
    let video = assets.filter((e) => e.assetType === "video");
    return [...video, ...sortByIdASC(imgArr)];
  }

  return [];
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

export const handleFindFirstImgAssetInOrderItem = (orderItem) => {
  if (orderItem) {
    let assets = orderItem.productOptions.product.assets;
    let img = assets.find((e) => e.assetType === "image");
    if (img) {
      return img.url;
    }
  }
  return "";
};

export const handleFindFirstImgAssetInProduct = (product) => {
  if (product) {
    let assets = product.assets;
    let img = assets.find((e) => e.assetType === "image");
    if (img) {
      return img.url;
    }
  }
  return "";
};

export const handleDisableOVerflowY = (isDisable) => {
  if (isDisable) {
    document.body.style.overflowY = "hidden";
    document.body.style.overflowX = "hidden";
  } else {
    document.body.style.overflowY = "auto";
    document.body.style.overflowX = "hidden";
  }
};

export const handleAnimateToggle = (setIsActive) => {
  handleDisableOVerflowY(true);
  setTimeout(() => {
    setIsActive(true);
  }, 50);
};

export const handleCloseAnimateToggle = (setIsActive, closeModal) => {
  setIsActive(false);
  handleDisableOVerflowY(false);
  setTimeout(() => {
    closeModal();
  }, 400);
};

export const updateSpecificRoom = (newRoomValue, currentRoomArr) => {
  if (newRoomValue && currentRoomArr) {
    let roomTemp = [...currentRoomArr];
    let index = roomTemp.findIndex((e) => e.id === newRoomValue.id);
    roomTemp[index] = newRoomValue;
    return roomTemp;
  }
};

export const isExistRoomWithShopId = (roomList, shopId) => {
  let check = false;
  if (roomList && shopId) {
    roomList.map((e) => {
      let userRoom = e.room.userRoom;
      userRoom.map((i) => {
        let shop = i.userInfo.user.shop;

        if (shop && shop.id === shopId) {
          return (check = true);
        }
      });
    });
  }
  return check;
};

export const findUserRoomIndexInRoomList = (roomList, userRoom) => {
  return roomList.findIndex((e) => e.id == userRoom.id);
};

export const handleFindSellerInUserRoom = (userRoom, type) => {
  let tempUserRoom = userRoom.room.userRoom;
  return tempUserRoom.find((e) => e.role.name === type);
};

export const handleFindUserInUserRoomById = (userRoom, userId) => {
  let tempUserRoom = userRoom.room.userRoom;
  return tempUserRoom.find((e) => e.userInfo.user.id === userId);
};

export const handleFindPartnerInUserRoomById = (userRoom, userId) => {
  let tempUserRoom = userRoom.room.userRoom;
  return tempUserRoom.find((e) => e.userInfo.user.id !== userId);
};

export const sortByIdASC = (arr) => {
  if (arr && Array.isArray(arr)) {
    let newArr = [...arr];
    newArr.sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      } else if (a.id < b.id) {
        return -1;
      } else {
        return 0;
      }
    });
    return newArr;
  }
  return [];
};

export const getParentBusiness = (bus) => {
  let business = { ...bus };
  while (business.business.length !== 0) {
    business = business.business[0];
  }
  return business;
};

export const formatTwoDecimalNumber = (number) => {
  return Math.round(number * 100) / 100;
};
