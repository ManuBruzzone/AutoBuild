const Producto = require("./producto");
const Venta = require("./ventas");
const ProductoVenta = require("./productoventa");

Producto.belongsToMany(Venta, { through: ProductoVenta });
Venta.belongsToMany(Producto, { through: ProductoVenta });

module.exports = {Producto, Venta, ProductoVenta,
};