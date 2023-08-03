package com.e_commerce.service.serviceIMPL;

import com.e_commerce.dto.request.CategoriesSearchForm;
import com.e_commerce.dto.request.CreateBusinessForm;
import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.Business;
import com.e_commerce.model.Product;
import com.e_commerce.repository.IBusinessRepository;
import com.e_commerce.service.IBusinessService;
import com.e_commerce.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BusinessServiceIMPL implements IBusinessService {

    private final IBusinessRepository businessRepository;
    private final IProductService productService;

    @Override
    public List<Business> findAll() {
        return businessRepository.findAll();
    }

    @Override
    public Business findById(Long id) {
        Optional<Business> business = businessRepository.findById(id);
        if (!business.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found business at id: " + id);
        }
        return business.get();
    }

    @Override
    public Business save(Business business) {
        return businessRepository.save(business);
    }

    @Override
    public void deleteById(Long id) {
        businessRepository.deleteById(id);
    }

    @Override
    public Set<Business> findByBusinessIsEmpty() {
        return businessRepository.findByBusinessIsEmpty();
    }

    @Override
    public Set<Business> findByNameContainingIgnoreCase(String name) {
        return businessRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public List<Product> findProductByBusinessId(Long businessId) {
        Business businesses = findById(businessId);

        Set<Business> allRelativeBusiness = new HashSet<>();
        allRelativeBusiness.add(businesses);
        businesses.getSubBusiness().forEach(subBusiness -> {
            allRelativeBusiness.add(subBusiness);
            if (subBusiness.getSubBusiness().size() != 0) {
                allRelativeBusiness.addAll(subBusiness.getSubBusiness());
            }
        });

        Set<Product> products = new HashSet<>();
        allRelativeBusiness.forEach(business ->
                products.addAll(business.getProduct())
        );

        List<Product> productList = new ArrayList<>(products);
        Collections.shuffle(productList);
        return productList;
    }

    @Override
    public Set<Product> searchValueByCategoriesSearchForm(CategoriesSearchForm categoriesSearchForm) {

        Set<Product> products = new HashSet<>();
        Business business = findById(categoriesSearchForm.getBusinessId());
        if (categoriesSearchForm.getSubBusinessId() == null) {
            products.addAll(business.getProduct());
            business.getSubBusiness().forEach(bus -> {
                products.addAll(bus.getProduct());
                if (bus.getSubBusiness().size() != 0) {
                    bus.getSubBusiness().forEach(childrenBus -> products.addAll(childrenBus.getProduct()));
                }
            });
        }

        if (categoriesSearchForm.getSubBusinessId() != null) {
            Business subBusiness = findById(categoriesSearchForm.getSubBusinessId());
            if (!business.getSubBusiness().contains(subBusiness)) {
                throw new ApiRequestException(HttpStatus.NOT_FOUND, "Business not contain sub business id: " + categoriesSearchForm.getSubBusinessId());
            }

            products.addAll(subBusiness.getProduct());
            if (subBusiness.getSubBusiness().size() != 0) {
                subBusiness.getSubBusiness().forEach(bus ->
                        products.addAll(bus.getProduct())
                );
            }
        }

        products.removeIf(p -> !p.getOnSale());
        products.removeIf(Product::isBlock);

        if (categoriesSearchForm.getSearchName() != null)
            products.removeIf(p -> !p.getName().toLowerCase().contains(categoriesSearchForm.getSearchName().toLowerCase()));

        if (categoriesSearchForm.getRate() != null)
            products.removeIf(p -> p.getRate() < categoriesSearchForm.getRate());

        if (categoriesSearchForm.getProvinceCityId() != null)
            products.removeIf(p -> !p.getShop().getProvinceCity().getId().equals(categoriesSearchForm.getProvinceCityId()));

        if (categoriesSearchForm.getMinPrice() != null)
            products.removeIf(p -> productService.getMinPriceProductOption(p) < categoriesSearchForm.getMinPrice());

        if (categoriesSearchForm.getMaxPrice() != null)
            products.removeIf(p -> productService.getMinPriceProductOption(p) > categoriesSearchForm.getMaxPrice());

        return products;
    }

    @Override
    public Business createSubBusinessFromFormAndBusinessId(Long businessId, CreateBusinessForm createBusinessForm) {
        Business business = findById(businessId);

        Set<Business> subBusiness = new HashSet<>();
        for (String businessName : createBusinessForm.getSubBusiness()) {
            Business subBusinessItem = Business.builder()
                    .name(businessName)
                    .build();

            subBusiness.add(subBusinessItem);
        }
        business.setSubBusiness(subBusiness);
        return business;
    }
}
