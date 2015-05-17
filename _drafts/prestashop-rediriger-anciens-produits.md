---
layout: post
title:  "Prestashop : rediriger les anciens produits"
date:   9999-99-99
tags:
- prestashop
- php 
description: >
    Pour certaines boutiques, la liste des produits varie régulièrement : de nouveaux produits font leur apparition, et d'autres disparaissent. La suppression d'un produit pose problème en terme de référencement, en cela qu'elle génère une erreur 404. Voyons comment rediriger ces pages automatiquement.
---

## Rediriger un produit spécifique

Produit -> Information -> Redirection
301 / lien du produit

## Rediriger tous les anciens produits

	class ProductController extends ProductControllerCore
	{

		/**
		 * Initialize product controller
		 * @see FrontController::init()
		 */
		public function init()
		{
			parent::init();

			if ($id_product = (int)Tools::getValue('id_product'))
				$this->product = new Product($id_product, true, $this->context->language->id, $this->context->shop->id);

			if (!Validate::isLoadedObject($this->product))
			{
				header('HTTP/1.1 404 Not Found');
				header('Status: 404 Not Found');
				$this->errors[] = Tools::displayError('Product not found');
			}
			else
			{
				$this->canonicalRedirection();
				/*
				 * If the product is associated to the shop
				 * and is active or not active but preview mode (need token + file_exists)
				 * allow showing the product
				 * In all the others cases => 404 "Product is no longer available"
				 */
				if (!$this->product->isAssociatedToShop() || !$this->product->active)
				{
					if (Tools::getValue('adtoken') == Tools::getAdminToken('AdminProducts'.(int)Tab::getIdFromClassName('AdminProducts').(int)Tools::getValue('id_employee')))
					{
						// If the product is not active, it's the admin preview mode
						$this->context->smarty->assign('adminActionDisplay', true);
					}
					else
					{
						$this->context->smarty->assign('adminActionDisplay', false);
						if ($this->product->id_product_redirected == $this->product->id)
							$this->product->redirect_type = '404';

						switch ($this->product->redirect_type)
						{
							case '301':
								header('HTTP/1.1 301 Moved Permanently');
								header('Location: '.$this->context->link->getProductLink($this->product->id_product_redirected));
							break;
							case '302':
								header('HTTP/1.1 302 Moved Temporarily');
								header('Cache-Control: no-cache');
								header('Location: '.$this->context->link->getProductLink($this->product->id_product_redirected));
							break;
							case '404':
							default:
								$categories = Product::getProductCategories($this->product->id);
								if($categories && $categories[0]) {
									header('HTTP/1.1 301 Moved Permanently');
									header('Location: '.$this->context->link->getCategoryLink($categories[0]));
								} else {
									header('HTTP/1.1 301 Moved Permanently');
									header('Location: '.$this->context->link->getProductLink($this->product->id_product_redirected));
								}
							break;
						}
					}
				}
				elseif (!$this->product->checkAccess(isset($this->context->customer) ? $this->context->customer->id : 0))
				{
					header('HTTP/1.1 403 Forbidden');
					header('Status: 403 Forbidden');
					$this->errors[] = Tools::displayError('You do not have access to this product.');
				}
				else
				{
					// Load category
					if (isset($_SERVER['HTTP_REFERER'])
						&& strstr($_SERVER['HTTP_REFERER'], Tools::getHttpHost()) // Assure us the previous page was one of the shop
						&& preg_match('!^(.*)\/([0-9]+)\-(.*[^\.])|(.*)id_category=([0-9]+)(.*)$!', $_SERVER['HTTP_REFERER'], $regs))
					{
						// If the previous page was a category and is a parent category of the product use this category as parent category
						if (isset($regs[2]) && is_numeric($regs[2]))
						{
							if (Product::idIsOnCategoryId((int)$this->product->id, array('0' => array('id_category' => (int)$regs[2]))))
								$this->category = new Category($regs[2], (int)$this->context->cookie->id_lang);
						}
						else if (isset($regs[5]) && is_numeric($regs[5]))
						{
							if (Product::idIsOnCategoryId((int)$this->product->id, array('0' => array('id_category' => (int)$regs[5]))))
								$this->category = new Category($regs[5], (int)$this->context->cookie->id_lang);
						}
					}
					else
						// Set default product category
						$this->category = new Category($this->product->id_category_default, (int)$this->context->cookie->id_lang);
				}
			}
		}
	}

## Rediriger toutes les anciennes catégories

	class CategoryController extends CategoryControllerCore
	{

	    /**
	     * Initialize category controller
	     * @see FrontController::init()
	     */
	    public function init()
	    {
	        parent::init();

	        // Get category ID
	        $id_category = (int)Tools::getValue('id_category');
	        if (!$id_category || !Validate::isUnsignedId($id_category))
	            $this->errors[] = Tools::displayError('Missing category ID');

	        // Instantiate category
	        $this->category = new Category($id_category, $this->context->language->id);

	        parent::init();
	        //check if the category is active and return 404 error if is disable.
	        if (!$this->category->active)
	        {
	            if($this->category->id_parent) {
	                header('HTTP/1.1 301 Moved Permanently');
	                header('Location: '.$this->context->link->getCategoryLink($this->category->id_parent));
	            } else {
	                header('HTTP/1.1 404 Not Found');
	                header('Status: 404 Not Found');
	            }
	        }
	        //check if category can be accessible by current customer and return 403 if not
	        if (!$this->category->checkAccess($this->context->customer->id))
	        {
	            header('HTTP/1.1 403 Forbidden');
	            header('Status: 403 Forbidden');
	            $this->errors[] = Tools::displayError('You do not have access to this category.');
	            $this->customer_access = false;
	        }
	    }

	}

## Liens :
