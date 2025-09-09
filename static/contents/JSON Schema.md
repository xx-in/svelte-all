# JSON Schema

所谓`JSON Schema`，其实是指一个`JSON协议`。因为`JSON`本身构造非常简单，在各种编程语言中都能轻松实现构造和解析，`JSON`是一种非常方便实用的消息传输格式。而`JSON Schema`则定义了一套固定的`JSON`结构，该结构用于固定的使用场景，在详细讲解之前，先了解清楚`JSON`中支持的类型。

## JSON 数据类型

`JSON`的全称是`JavaScript Object Notation`，其来源于`JavaScript`中字面量形式的写法，包含以下类型：

1. number：数字类型，包含整数(integer)和浮点数(float)
2. string：字符串类型
3. null：空值，表示不存在
4. object：对象类型
5. array：数组类型

如果要表示个人信息的内容，可以有以下多种结构：

```json
{
  "name": "George Washington",
  "birthday": "February 22, 1732",
  "address": "Mount Vernon, Virginia, United States"
}
```

```json
{
  "first_name": "George",
  "last_name": "Washington",
  "birthday": "1732-02-22",
  "address": {
    "street_address": "3200 Mount Vernon Memorial Highway",
    "city": "Mount Vernon",
    "state": "Virginia",
    "country": "United States"
  }
}
```

对于上述两种结构，其实都能展示个人信息的大多数内容，如何选择就只是应用场景和偏好问题。但这两种结构都存在一个相同的问题，那就是缺乏约束，每个字段是什么类型，有哪些约束条件都需要通过沟通解决，而且因为不同开发者偏好不同，可能上述两种结构会同时存在于一个软件应用中，这显然带来了很多维护上的问题。

换句话说，`JSON`
对象是人类可读的，但它不包含任何上下文或元数据。仅凭外观无法判断对象中的键的含义或可能的输入。`JSON Schema`
是一个提供这些问题答案的标准。

## JSON Schema

`JSON Schema`就是为了解决上述问题而出现的，对于所有的数据类型都统一定义为对象，而后根据预设的约束条件进行解析。

```json
{
  "type": "object",
  "properties": {
    "first_name": { "type": "string" },
    "last_name": { "type": "string" },
    "birthday": { "type": "string", "format": "date" },
    "address": {
      "type": "object",
      "properties": {
        "street_address": { "type": "string" },
        "city": { "type": "string" },
        "state": { "type": "string" },
        "country": { "type": "string" }
      }
    }
  }
}
```

上述的`type`，`properties`，`format`就是其中一些约束条件。这样不但减少了沟通成本，最大的便利是可以统一用一套相同的结构来表示各种要求的数据，这样可以自动对数据进行校验！！这是后续自动化的基础。

## 版本标注

因为标准是一直在发展的，所以需要一个字段表示当前使用哪个版本的解析器进行解析，虽然该字段不是必填的，默认会用最新标准解析，但这存在解析错误的可能，所以推荐指定版本。

```json
{ "$schema": "https://json-schema.org/draft/2020-12/schema" }
```

## 唯一标识

另一个类似的字段是唯一标识，每个不同的类型应该有一个唯一标识，这对于区分相似但不相同的相近类型时有大用，待完善。

```json
{ "$id": "http://yourdomain.com/schemas/myschema.json" }
```

## 基本结构

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/product.schema.json",
  "title": "Product",
  "description": "A product from Acme's catalog",
  "type": "object",
  "properties": {
    "productId": {
      "description": "The unique identifier for a product",
      "type": "integer"
    },
    "productName": {
      "description": "Name of the product",
      "type": "string"
    },
    "price": {
      "description": "The price of the product",
      "type": "number",
      "exclusiveMinimum": 0
    },
    "tags": {
      "description": "Tags for the product",
      "type": "array",
      "items": {
        "type": "string"
      },
      "minItems": 1,
      "uniqueItems": true
    },
    "dimensions": {
      "type": "object",
      "properties": {
        "length": {
          "type": "number"
        },
        "width": {
          "type": "number"
        },
        "height": {
          "type": "number"
        }
      },
      "required": ["length", "width", "height"]
    },
    "warehouseLocation": {
      "description": "Coordinates of the warehouse where the product is located.",
      "$ref": "https://example.com/geographical-location.schema.json"
    },
    "enum": {
      "type": "object",
      "properties": {
        "data": {
          "enum": [42, true, "hello", null, [1, 2, 3]]
        }
      }
    },
    "code": {
      "type": "string",
      "pattern": "^[A-Z]{3}-\\d{3}$"
    }
  },
  "required": ["productId", "productName", "price"]
}
```
