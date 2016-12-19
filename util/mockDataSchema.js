export const schema = {
    "type": "object",
    "properties": {
        "cliente": {
            "type": "array",
            "minItems": 50,
            "maxItems": 50,
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "unique": true,
                        "faker": "random.uuid"
                    },
                    "nombre": {
                        "type": "string",
                        "faker": "company.companyName"
                    },
                    "razonSocial": {
                        "type": "string",
                        "faker": "company.companySuffix"
                    },
                    "telefono": {
                        "type": "string",
                        "faker": "phone.phoneNumberFormat"
                    },
                    "sitioweb": {
                        "type": "string",
                        "faker": "internet.url"
                    },
                    "comentarios": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod magna aliqua.",
                    "direccion": {
                        "calle": {
                            "type": "string",
                            "faker": "address.streetName"
                        },
                        "codigoPostal": {
                            "type": "string",
                            "faker": "address.zipCode"
                        },
                        "colonia": {
                            "type": "string",
                            "faker": "address.county"
                        },
                        "comentarios": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                        "estado": {
                            "id": {
                                "type": "number",
                                "faker": {
                                    "random.number": {
                                        "min": 1, "max": 100
                                    }
                                }
                            },
                            "nombre": {
                                "type": "string",
                                "faker": "address.state"
                            }
                        },
                        "municipio": {
                            "id": {
                                "type": "number",
                                "faker": {
                                    "random.number": {
                                        "min": 1, "max": 100
                                    }
                                }
                            },
                            "nombre": {
                                "type": "string",
                                "faker": "address.city"
                            }
                        },
                        "numero": {
                            "type": "number",
                            "faker": "random.number"
                        },
                        "pais": {
                            "id": {
                                "type": "number",
                                "faker": {
                                    "random.number": {
                                        "min": 1, "max": 1
                                    }
                                }
                            },
                            "nombre": "Mexico"
                        },
                        "ubicacion": {
                            "latitud": {
                                "type": "float",
                                "faker": "address.latitude"
                            },
                            "longitud": {
                                "type": "float",
                                "faker": "address.longitude"
                            }
                        }
                    },
                    "rfc": {
                        "type": "string",
                        "pattern": "^[A-F]{1}[A-F]{1}[A-F]{1}[A-F]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}$"
                    }
                },
                "required": ["id", "nombre", "razonSocial", "telefono", "sitioweb", "rfc", "comentarios", "direccion"]
            }
        },
        "obra": {
            "type": "array",
            "minItems": 50,
            "maxItems": 50,
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "unique": true,
                        "pattern": "^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$"
                    },
                    "Descripcion": {
                        "type": "string",
                        "faker": "commerce.productName"
                    }
                },
                "required": ["id", "Descripcion"]
            }
        }
    },
    "required": ["cliente", "obra"]
};
