package com.avantika.quiz_platform_backend.service;

import com.avantika.quiz_platform_backend.entity.Category;
import java.util.List;

public interface CategoryService {

    Category createCategory(String name, String description);

    List<Category> getAllCategories();

    Category getCategoryById(Long id);

    Category updateCategory(
            Long id,
            String name,
            String description
    );

    void deleteCategory(Long id);
}