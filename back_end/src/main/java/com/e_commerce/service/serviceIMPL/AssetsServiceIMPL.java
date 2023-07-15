package com.e_commerce.service.serviceIMPL;

import com.e_commerce.dto.request.AssetCreateForm;
import com.e_commerce.model.Assets;
import com.e_commerce.repository.IAssetsRepository;
import com.e_commerce.service.IAssetService;
import lombok.RequiredArgsConstructor;
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
    public Optional<Assets> findById(Long id) {
        return assetsRepository.findById(id);
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
