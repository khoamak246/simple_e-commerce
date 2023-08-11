package com.e_commerce.service.serviceIMPL;

import com.e_commerce.dto.request.AssetCreateForm;
import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.Assets;
import com.e_commerce.repository.IAssetsRepository;
import com.e_commerce.service.IAssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AssetsServiceIMPL implements IAssetService {

    private final IAssetsRepository assetsRepository;

    @Override
    public List<Assets> findAll() {
        return assetsRepository.findAll();
    }

    @Override
    public Assets findById(Long id) {
        Optional<Assets> assets = assetsRepository.findById(id);
        if (!assets.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found assets at id: " + id);
        }
        return assets.get();
    }

    @Override
    public Assets save(Assets assets) {
        return assetsRepository.save(assets);
    }

    @Override
    public void deleteById(Long id) {
        assetsRepository.deleteById(id);
    }

    @Override
    public Set<Assets> createListAssetsByForm(List<AssetCreateForm> assetList) {
        Set<Assets> assets = new HashSet<>();
        assetList.forEach(asset -> {
            Assets newAsset = Assets.builder()
                    .url(asset.getUrl())
                    .assetType(asset.getAssetType())
                    .build();

            assets.add(newAsset);
        });
        return assets;
    }
}
