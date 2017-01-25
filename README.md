**Publica un mensaje en broker V2**
----
  Publica un mensaje en el broker en el topico indicado.

* **/api/v2/mqtt**

* **POST:**
    
* **Parámetros en Data**
  
  * **topico:** String <br />
  * **mensaje:** String u Objeto

* **Respuesta exitosa:**
  
  * **Descripción:** Mismo payload que envías<br />
  * **Código:** 200 <br />
    **Contennido:**
    
    ```json
     {
        "topico": "juan-crisostomo",
        "mensaje": {
          "idFuncion": 1,
          "idReferencia": "789-ewq-qew"
        }
      }
    ```
      
* **Ejemplo de petición:**
 
    ```json
    {
      "topico": "juan-crisostomo",
      "mensaje": {
        "idFuncion": 1,
        "idReferencia": "789-ewq-qew"
      }
    }
    ``` 
