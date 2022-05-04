// Michael East and Rupert Taylor

// Store Management Software

import { nanoid } from "https://cdn.skypack.dev/nanoid";

/* Item in Store
- ID/Barcode - Make this unchangeable?
- Item Name
- Item cost_Price
- Item selling_price
- Item Category
- Item In Stock
*/

class Item {
	constructor(name, costPrice, sellingPrice, category, inStock, id){
    if(!(typeof name === 'string')){
      throw new Error(`Expected string for property name but received ${name} (type: ${typeof name})`);
    }
    if (name.length === 0) {
      throw new Error(`The name field is required`);
    }
	  this.name = name;

    if(typeof costPrice !== 'number'){
      throw new Error(`Expected number for property costPrice but received ${costPrice} (type: ${typeof costPrice})`);
    }
    if (costPrice % 1 > 0){
      throw new Error(`Expected whole number for costPrice but received ${costPrice}. Please give amount in whole pence only.`);
    }
	  this.costPrice = costPrice;

    if(typeof costPrice !== 'number'){
      throw new Error(`Expected number for property sellingPrice but received ${sellingPrice} (type: ${typeof sellingPrice})`);
    }
    if (costPrice % 1 > 0){
      throw new Error(`Expected whole number for sellingPrice but received ${sellingPrice}. Please give amount in whole pence only.`);
    }
    this.sellingPrice = sellingPrice;

    if(typeof category !== 'string'){
      throw new Error(`Expected string for property category but received ${category} (type: ${typeof category})`);
    }
    if (category.length === 0) {
      throw new Error(`The category field is required`);
    }
	  this.category = category;

    if(typeof inStock !== "boolean"){
      throw new Error(`Expected boolean for property inStock but received ${inStock} (type: ${typeof inStock})`);
    }
    this.inStock = inStock;

	  this._id = nanoid();
	}
  }

  
  /* Store Management Software
  - Items Array
  
  Methods:
  - addItems
  - removeItems
  - updateItem
  - View in Stock items
  - View filtered items
  */

  class ManageStore {
	  items = [];

    constructor(name) {
      if(!(typeof name === 'string')){
        throw new Error(`Expected string for property name but received ${name} (type: ${typeof name})`);
      }
      this.name = name;
    }

	  addItem (data){
		let _item = data
		if(!(data instanceof Item)){
			_item = new Item(data.name, data.costPrice, data.sellingPrice, data.category, data.inStock, data._id);
		}
		this.items.push(_item);
    return _item._id;
	  }

	  removeItem(id){
      const idx = this.items.findIndex(function(item){
        return item._id === id;
      });
      this.items.splice(idx, 1);
	  }

	  updateItem(id, updates){
      const idx = this.items.findIndex(function (item){
        return item._id === id;
      });
      const item = this.items[idx];
      Object.assign(item, updates);
      
	  }
    
    // | Look up whether something has the value true for 'in stock'
    // | Copy it into a new array
    // | Console.Log the new Array

    seeInStock() {
      const inStockItems = this.items.filter(function(item){
        return item.inStock === true;
      });
      console.log('Our In Stock Items:', inStockItems);
    }

    // | Change instock to false
    // | Print out Congrats Message, with profit count

    sellItem(id) {
      const idx = this.items.findIndex(function (item){
        return item._id === id;
      });
      const item = this.items[idx];
      item.inStock = false;
      console.log(`You sold ${item.name} and your profit is:`, item.sellingPrice - item.costPrice);
    }

    filterItemsOr(criteria){
      const filteredItems = this.items.filter(function(item){
        let _boolResults = [];
        for (const [key, value] of Object.entries(criteria)) {
          if (typeof value === typeof item[key] && typeof item[key] === 'string'){
            let criterion = value.toLowerCase();
            let itemValue = item[key].toLowerCase();
            if (itemValue.includes(criterion)) {
              const result = true;
              _boolResults.push(result);
            } else {
              const result = false;
              _boolResults.push(result);
            }
            continue;
          } if (typeof value === typeof item[key] && typeof item[key] !== 'string') {
            if (item[key] === value) {
              const result = true;
              _boolResults.push(result);
            } else {
              const result = false;
              _boolResults.push(result);
            }
            continue;
          } if (value === undefined || value === null) {
            continue;
          } else {
            throw new Error(`Was expecting ${typeof item[key]} but got ${value} (${typeof value}) for ${key}`);
          }
        }
        console.log(item, _boolResults);
        return _boolResults.some(function(element){
          return element === true;
        })
      });


        console.log(`'OR' Filter: `, criteria, `${filteredItems.length} Results: `, filteredItems);
    }

    filterItemsAnd(criteria){
      const filteredItems = this.items.filter(function(item){
        let _boolResults = [];
        for (const [key, value] of Object.entries(criteria)) {
          
          if (typeof value === typeof item[key] && typeof item[key] === 'string'){
            console.log(`1. testing criterion (${key}: ${value}) against item (${item[key]})`)
            if (item[key].includes(value)) {
              const result = true;
              _boolResults.push(result);
            } else {
              const result = false;
              _boolResults.push(result);
            }
            console.log(item, _boolResults);
            continue;
          } if (typeof value === typeof item[key] && typeof item[key] !== 'string') {
            console.log(`2. testing criterion (${key}: ${value}) against item (${item[key]})`)
            if (item[key] === value) {
              const result = true;
              _boolResults.push(result);
            } else {
              const result = false;
              _boolResults.push(result);
            }
            console.log(item, _boolResults);
            continue;
          } if (value === undefined || value === null) {
            continue;
          } else {
            throw new Error(`Was expecting ${typeof item[key]} but got ${value} (${typeof value}) for ${key}`);
          }
          
        }
        console.log(item, _boolResults);
        return _boolResults.every(function(element){
          return element === true;
        })
      });


        console.log(`'And' Filter: `, criteria, `${filteredItems.length} Results: `, filteredItems);
    }

    filterBySellingPriceRange(min, max) {
      if (!(typeof min === 'number' && typeof max === 'number')){
        throw new Error(`Was expecting 2 numbers but got ${min} (${typeof min}) and ${max} (${typeof max})`);
      } 
      
      const filteredItems = this.items.filter(function(item){
        return min <= item.sellingPrice && item.sellingPrice <= max;
      });

      console.log(`There are ${filteredItems.length} items with sellingPrice between ${min} and ${max}: `, filteredItems);
    }
  }

// * Creating a Store

const ourStore = new ManageStore(`Rupert and Michael's Store`);
  
  // * Creating some items


  const item1 = {
    name: 'New York Skyline Painting',
    costPrice: 6000, 
    sellingPrice: 10000,
    category: 'Art', 
    inStock: true,
  }

  const item2 = {
    name: 'Gold Floor Lamp',
    costPrice: 1000, 
    sellingPrice: 2000,
    category: 'Homeware', 
    inStock: true,
  }

  const item3 = {
    name: 'Gold Desk Lamp',
    costPrice: 600, 
    sellingPrice: 1000,
    category: 'Homeware', 
    inStock: true,
  }

  const item4 = {
    name: 'Blue Desk Lamp',
    costPrice: 600, 
    sellingPrice: 1000,
    category: 'Homeware', 
    inStock: true,
  }

  const item5 = {
    name: 'Green Desk Lamp',
    costPrice: 7000, 
    sellingPrice: 10000,
    category: 'Homeware', 
    inStock: true,
  }

  const item6 = {
    name: 'Waterlillies by Monet',
    costPrice: 7000000, 
    sellingPrice: 100000000,
    category: 'Art', 
    inStock: true,
  }


  // * Adding items into ourStore

  const newItemId1 = ourStore.addItem(item1);
  const newItemId2 = ourStore.addItem(item2);
  const newItemId3 = ourStore.addItem(item3);
  const newItemId4 = ourStore.addItem(item4);
  const newItemId5 = ourStore.addItem(item5);
  const newItemId6 = ourStore.addItem(item6);


// * Remove Item

// ourStore.removeItem(newItemId1);

// * Updating an Item

const itemUpdate = {
  sellingPrice: 50000,
}

ourStore.updateItem(newItemId2, itemUpdate);

// * View items in stock

ourStore.seeInStock();

// * Selling an item, and getting the profit margin

ourStore.sellItem(newItemId2);


// ** Alter this object to filter the ourStore stock using .filterItemsOr() or .filterItemsAnd() methods.
const filterCriteria = {
  name: 'lillies',
  inStock: false,
  category: null,
  costPrice: undefined,
  sellingPrice: 10000,
}

ourStore.filterItemsOr(filterCriteria);

ourStore.filterItemsAnd(filterCriteria);

ourStore.filterBySellingPriceRange(500, 10000);


console.log('Our Store Items:', ourStore);

