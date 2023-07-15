package com.e_commerce.service;

import com.e_commerce.dto.request.AssetCreateForm;
import com.e_commerce.model.Assets;
import com.e_commerce.service.design.IGenericService;

import java.util.List;
import java.util.Set;

public interface IAssetService extends IGenericService<Assets> {

    Set<Assets> createListAssetsByForm(List<AssetCreateForm> assetList);

}
