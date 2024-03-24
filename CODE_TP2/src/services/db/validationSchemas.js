

// users
userSchema = {
    "title": "User",
    "type": "object",
    "properties": {
        "id": {"type": "integer", "unique": true},
        "username": {"type": "string"},
        "age": {"type": "integer"},
        "email": {
            "type": "string",
            "format": "email"
        },
        "telephone": {
            "type": "object",
            "properties": {
                "home": {"type": "string"},
                "work": {"type": "string"},
                "mobile": {"type": "string"}
            }
        },
        "address": {
            "type": "object",
            "properties": {
                "street": {"type": "string"},
                "city": {"type": "string"},
                "country": {"type": "string"}
            }
        },
        "watchlists": {
            "type": "array",
            "items": {
                "type": "integer"
            }
        }
    },
    "required": ["username"],
    "additionalProperties": false
}


// items
itemSchema = {
    "id": {"type": "integer", "unique": true},
    "titre": {"type": "string"},
    "annee": {"type": "string"},
    "realisateur": {"type": "string"},
    "description": {"type": "string"},
    "langue": {"type": "string"},
    "type": {"type": "string"}
}


// watchlists
watchlistSchema = {
    "id": {"type": "integer", "unique": true},
    "nom": {"type": "string"},
    "items": {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "itemId": {"type": "integer"},
                "titre": {"type": "string"},
                "status": {"type": "string"}
            }
        }
    }
}

module.exports = {
    userSchema,
    itemSchema,
    watchlistSchema
}
