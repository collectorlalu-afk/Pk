import { execSync } from 'child_process';

export const query = (sql: string) => {
  try {
    const result = execSync(`team-db "${sql.replace(/"/g, '\\"')}"`, { encoding: 'utf8' });
    return JSON.parse(result);
  } catch (error: any) {
    console.error('Database query error:', error);
    throw error;
  }
};

export const products = {
  getAll: () => query('SELECT * FROM products'),
  getById: (id: number) => query(`SELECT * FROM products WHERE id = ${id}`)[0],
  create: (p: any) => query(`INSERT INTO products (name, description, price, whats_included, image_url, download_link, category) VALUES ('${p.name}', '${p.description}', ${p.price}, '${p.whats_included}', '${p.image_url}', '${p.download_link}', '${p.category}')`),
  update: (id: number, p: any) => query(`UPDATE products SET name='${p.name}', description='${p.description}', price=${p.price}, whats_included='${p.whats_included}', image_url='${p.image_url}', download_link='${p.download_link}', category='${p.category}' WHERE id=${id}`),
  delete: (id: number) => query(`DELETE FROM products WHERE id = ${id}`)
};

export const orders = {
  getAll: () => query('SELECT * FROM orders'),
  getById: (id: string) => query(`SELECT * FROM orders WHERE id = '${id}'`)[0],
  create: (o: any) => query(`INSERT INTO orders (id, customer_email, total_amount, payment_status, delivery_status, items_purchased) VALUES ('${o.id}', '${o.customer_email}', ${o.total_amount}, '${o.payment_status}', '${o.delivery_status}', '${o.items_purchased}')`),
  updateStatus: (id: string, payment_status: string, delivery_status: string) => query(`UPDATE orders SET payment_status='${payment_status}', delivery_status='${delivery_status}' WHERE id='${id}'`),
  getAnalytics: () => query('SELECT SUM(total_amount) as revenue, COUNT(*) as order_count FROM orders WHERE payment_status = "completed"')
};

export const downloadTokens = {
  create: (token: string, orderId: string, productId: number, expiresAt: string) => 
    query(`INSERT INTO download_tokens (token, order_id, product_id, expires_at) VALUES ('${token}', '${orderId}', ${productId}, '${expiresAt}')`),
  getByToken: (token: string) => query(`SELECT * FROM download_tokens WHERE token = '${token}'`)[0],
  verify: (token: string) => {
    const t = query(`SELECT * FROM download_tokens WHERE token = '${token}' AND expires_at > datetime('now')`)[0];
    return t;
  }
};

export const customers = {
  getByEmail: (email: string) => query(`SELECT * FROM customers WHERE email = '${email}'`)[0],
  upsert: (email: string, orderId: string) => {
    const customer = query(`SELECT * FROM customers WHERE email = '${email}'`)[0];
    if (customer) {
      const history = JSON.parse(customer.purchase_history || '[]');
      history.push(orderId);
      return query(`UPDATE customers SET purchase_history = '${JSON.stringify(history)}' WHERE email = '${email}'`);
    } else {
      return query(`INSERT INTO customers (email, purchase_history) VALUES ('${email}', '${JSON.stringify([orderId])}')`);
    }
  }
};
