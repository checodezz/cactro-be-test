# Cache API

This is a simple in-memory cache API that allows you to store, retrieve, delete, and manage key-value pairs with a predefined maximum cache size.

## API Endpoints

### 1. **POST /cache**
   - **Description**: Adds a new key-value pair to the cache.
   - **Request Body**: 
     - `key`: The key to store the value under.
     - `value`: The value to store.
   - **Response**:
     - **200 OK**: Item successfully added.
     - **400 Bad Request**: If key/value is missing or if cache is full.

### 2. **GET /cache/:key**
   - **Description**: Retrieves the value associated with the provided key.
   - **Parameters**:
     - `:key` (URL Parameter) — The key whose value you want to retrieve.
   - **Response**:
     - **200 OK**: Returns the value for the provided key.
     - **404 Not Found**: If the key is not found.

### 3. **DELETE /cache/:key**
   - **Description**: Removes a key-value pair from the cache.
   - **Parameters**:
     - `:key` (URL Parameter) — The key to delete.
   - **Response**:
     - **200 OK**: Key successfully removed.
     - **404 Not Found**: If the key is not found.

### 4. **GET /cache**
   - **Description**: Retrieves all key-value pairs currently stored in the cache.
   - **Response**:
     - **200 OK**: Returns all items in the cache.

## Environment Variables

- **MAX_CACHE_SIZE**: The maximum number of key-value pairs allowed in the cache. Default value is `10`. You can adjust it in the `.env` file.

