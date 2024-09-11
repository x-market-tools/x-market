[
    {
        "name": "FORMAT",
        "base": "",
        "fields": [
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "type",
                "type": "string"
            }
        ]
    },
    {
        "name": "acceptoffer",
        "base": "",
        "fields": [
            {
                "name": "offer_id",
                "type": "uint64"
            }
        ]
    },
    {
        "name": "addcolauth",
        "base": "",
        "fields": [
            {
                "name": "collection_name",
                "type": "name"
            },
            {
                "name": "account_to_add",
                "type": "name"
            }
        ]
    },
    {
        "name": "addconftoken",
        "base": "",
        "fields": [
            {
                "name": "token_contract",
                "type": "name"
            },
            {
                "name": "token_symbol",
                "type": "symbol"
            }
        ]
    },
    {
        "name": "addnotifyacc",
        "base": "",
        "fields": [
            {
                "name": "collection_name",
                "type": "name"
            },
            {
                "name": "account_to_add",
                "type": "name"
            }
        ]
    },
    {
        "name": "admincoledit",
        "base": "",
        "fields": [
            {
                "name": "collection_format_extension",
                "type": "FORMAT[]"
            }
        ]
    },
    {
        "name": "announcedepo",
        "base": "",
        "fields": [
            {
                "name": "owner",
                "type": "name"
            },
            {
                "name": "symbol_to_announce",
                "type": "symbol"
            }
        ]
    },
    {
        "name": "assets_s",
        "base": "",
        "fields": [
            {
                "name": "asset_id",
                "type": "uint64"
            },
            {
                "name": "collection_name",
                "type": "name"
            },
            {
                "name": "schema_name",
                "type": "name"
            },
            {
                "name": "template_id",
                "type": "int32"
            },
            {
                "name": "ram_payer",
                "type": "name"
            },
            {
                "name": "backed_tokens",
                "type": "asset[]"
            },
            {
                "name": "immutable_serialized_data",
                "type": "uint8[]"
            },
            {
                "name": "mutable_serialized_data",
                "type": "uint8[]"
            }
        ]
    },
    {
        "name": "backasset",
        "base": "",
        "fields": [
            {
                "name": "payer",
                "type": "name"
            },
            {
                "name": "asset_owner",
                "type": "name"
            },
            {
                "name": "asset_id",
                "type": "uint64"
            },
            {
                "name": "token_to_back",
                "type": "asset"
            }
        ]
    },
    {
        "name": "balances_s",
        "base": "",
        "fields": [
            {
                "name": "owner",
                "type": "name"
            },
            {
                "name": "quantities",
                "type": "asset[]"
            }
        ]
    },
    {
        "name": "burnasset",
        "base": "",
        "fields": [
            {
                "name": "asset_owner",
                "type": "name"
            },
            {
                "name": "asset_id",
                "type": "uint64"
            }
        ]
    },
    {
        "name": "canceloffer",
        "base": "",
        "fields": [
            {
                "name": "offer_id",
                "type": "uint64"
            }
        ]
    },
    {
        "name": "collections_s",
        "base": "",
        "fields": [
            {
                "name": "collection_name",
                "type": "name"
            },
            {
                "name": "author",
                "type": "name"
            },
            {
                "name": "allow_notify",
                "type": "bool"
            },
            {
                "name": "authorized_accounts",
                "type": "name[]"
            },
            {
                "name": "notify_accounts",
                "type": "name[]"
            },
            {
                "name": "market_fee",
                "type": "float64"
            },
            {
                "name": "serialized_data",
                "type": "uint8[]"
            }
        ]
    },
    {
        "name": "config_s",
        "base": "",
        "fields": [
            {
                "name": "asset_counter",
                "type": "uint64"
            },
            {
                "name": "template_counter",
                "type": "int32"
            },
            {
                "name": "offer_counter",
                "type": "uint64"
            },
            {
                "name": "collection_format",
                "type": "FORMAT[]"
            },
            {
                "name": "supported_tokens",
                "type": "extended_symbol[]"
            }
        ]
    },
    {
        "name": "createcol",
        "base": "",
        "fields": [
            {
                "name": "author",
                "type": "name"
            },
            {
                "name": "collection_name",
                "type": "name"
            },
            {
                "name": "allow_notify",
                "type": "bool"
            },
            {
                "name": "authorized_accounts",
                "type": "name[]"
            },
            {
                "name": "notify_accounts",
                "type": "name[]"
            },
            {
                "name": "market_fee",
                "type": "float64"
            },
            {
                "name": "data",
                "type": "ATTRIBUTE_MAP"
            }
        ]
    },
    {
        "name": "createoffer",
        "base": "",
        "fields": [
            {
                "name": "sender",
                "type": "name"
            },
            {
                "name": "recipient",
                "type": "name"
            },
            {
                "name": "sender_asset_ids",
                "type": "uint64[]"
            },
            {
                "name": "recipient_asset_ids",
                "type": "uint64[]"
            },
            {
                "name": "memo",
                "type": "string"
            }
        ]
    },
    {
        "name": "createschema",
        "base": "",
        "fields": [
            {
                "name": "authorized_creator",
                "type": "name"
            },
            {
                "name": "collection_name",
                "type": "name"
            },
            {
                "name": "schema_name",
                "type": "name"
            },
            {
                "name": "schema_format",
                "type": "FORMAT[]"
            }
        ]
    },
    {
        "name": "createtempl",
        "base": "",
        "fields": [
            {
                "name": "authorized_creator",
                "type": "name"
            },
            {
                "name": "collection_name",
                "type": "name"
            },
            {
                "name": "schema_name",
                "type": "name"
            },
            {
                "name": "transferable",
                "type": "bool"
            },
            {
                "name": "burnable",
                "type": "bool"
            },
            {
                "name": "max_supply",
                "type": "uint32"
            },
            {
                "name": "immutable_data",
                "type": "ATTRIBUTE_MAP"
            }
        ]
    },
    {
        "name": "declineoffer",
        "base": "",
        "fields": [
            {
                "name": "offer_id",
                "type": "uint64"
            }
        ]
    },
    {
        "name": "extended_symbol",
        "base": "",
        "fields": [
            {
                "name": "sym",
                "type": "symbol"
            },
            {
                "name": "contract",
                "type": "name"
            }
        ]
    },
    {
        "name": "extendschema",
        "base": "",
        "fields": [
            {
                "name": "authorized_editor",
                "type": "name"
            },
            {
                "name": "collection_name",
                "type": "name"
            },
            {
                "name": "schema_name",
                "type": "name"
            },
            {
                "name": "schema_format_extension",
                "type": "FORMAT[]"
            }
        ]
    },
    {
        "name": "forbidnotify",
        "base": "",
        "fields": [
            {
                "name": "collection_name",
                "type": "name"
            }
        ]
    },
    {
        "name": "init",
        "base": "",
        "fields": []
    },
    {
        "name": "locktemplate",
        "base": "",
        "fields": [
            {
                "name": "authorized_editor",
                "type": "name"
            },
            {
                "name": "collection_name",
                "type": "name"
            },
            {
                "name": "template_id",
                "type": "int32"
            }
        ]
    },
    {
        "name": "logbackasset",
        "base": "",
        "fields": [
            {
                "name": "asset_owner",
                "type": "name"
            },
            {
                "name": "asset_id",
                "type": "uint64"
            },
            {
                "name": "backed_token",
                "type": "asset"
            }
        ]
    },
    {
        "name": "logburnasset",
        "base": "",
        "fields": [
            {
                "name": "asset_owner",
                "type": "name"
            },
            {
                "name": "asset_id",
                "type": "uint64"
            },
            {
                "name": "collection_name",
                "type": "name"
            },
            {
                "name": "schema_name",
                "type": "name"
            },
            {
                "name": "template_id",
                "type": "int32"
            },
            {
                "name": "backed_tokens",
                "type": "asset[]"
            },
            {
                "name": "old_immutable_data",
                "type": "ATTRIBUTE_MAP"
            },
            {
                "name": "old_mutable_data",
                "type": "ATTRIBUTE_MAP"
            },
            {
                "name": "asset_ram_payer",
                "type": "name"
            }
        ]
    },
    {
        "name": "logmint",
        "base": "",
        "fields": [
            {
                "name": "asset_id",
                "type": "uint64"
            },
            {
                "name": "authorized_minter",
                "type": "name"
            },
            {
                "name": "collection_name",
                "type": "name"
            },
            {
                "name": "schema_name",
                "type": "name"
            },
            {
                "name": "template_id",
                "type": "int32"
            },
            {
                "name": "new_asset_owner",
                "type": "name"
            },
            {
                "name": "immutable_data",
                "type": "ATTRIBUTE_MAP"
            },
            {
                "name": "mutable_data",
                "type": "ATTRIBUTE_MAP"
            },
            {
                "name": "backed_tokens",
                "type": "asset[]"
            },
            {
                "name": "immutable_template_data",
                "type": "ATTRIBUTE_MAP"
            }
        ]
    },
    {
        "name": "lognewoffer",
        "base": "",
        "fields": [
            {
                "name": "offer_id",
                "type": "uint64"
            },
            {
                "name": "sender",
                "type": "name"
            },
            {
                "name": "recipient",
                "type": "name"
            },
            {
                "name": "sender_asset_ids",
                "type": "uint64[]"
            },
            {
                "name": "recipient_asset_ids",
                "type": "uint64[]"
            },
            {
                "name": "memo",
                "type": "string"
            }
        ]
    },
    {
        "name": "lognewtempl",
        "base": "",
        "fields": [
            {
                "name": "template_id",
                "type": "int32"
            },
            {
                "name": "authorized_creator",
                "type": "name"
            },
            {
                "name": "collection_name",
                "type": "name"
            },
            {
                "name": "schema_name",
                "type": "name"
            },
            {
                "name": "transferable",
                "type": "bool"
            },
            {
                "name": "burnable",
                "type": "bool"
            },
            {
                "name": "max_supply",
                "type": "uint32"
            },
            {
                "name": "immutable_data",
                "type": "ATTRIBUTE_MAP"
            }
        ]
    },
    {
        "name": "logsetdata",
        "base": "",
        "fields": [
            {
                "name": "asset_owner",
                "type": "name"
            },
            {
                "name": "asset_id",
                "type": "uint64"
            },
            {
                "name": "old_data",
                "type": "ATTRIBUTE_MAP"
            },
            {
                "name": "new_data",
                "type": "ATTRIBUTE_MAP"
            }
        ]
    },
    {
        "name": "logtransfer",
        "base": "",
        "fields": [
            {
                "name": "collection_name",
                "type": "name"
            },
            {
                "name": "from",
                "type": "name"
            },
            {
                "name": "to",
                "type": "name"
            },
            {
                "name": "asset_ids",
                "type": "uint64[]"
            },
            {
                "name": "memo",
                "type": "string"
            }
        ]
    },
    {
        "name": "mintasset",
        "base": "",
        "fields": [
            {
                "name": "authorized_minter",
                "type": "name"
            },
            {
                "name": "collection_name",
                "type": "name"
            },
            {
                "name": "schema_name",
                "type": "name"
            },
            {
                "name": "template_id",
                "type": "int32"
            },
            {
                "name": "new_asset_owner",
                "type": "name"
            },
            {
                "name": "immutable_data",
                "type": "ATTRIBUTE_MAP"
            },
            {
                "name": "mutable_data",
                "type": "ATTRIBUTE_MAP"
            },
            {
                "name": "tokens_to_back",
                "type": "asset[]"
            }
        ]
    },
    {
        "name": "offers_s",
        "base": "",
        "fields": [
            {
                "name": "offer_id",
                "type": "uint64"
            },
            {
                "name": "sender",
                "type": "name"
            },
            {
                "name": "recipient",
                "type": "name"
            },
            {
                "name": "sender_asset_ids",
                "type": "uint64[]"
            },
            {
                "name": "recipient_asset_ids",
                "type": "uint64[]"
            },
            {
                "name": "memo",
                "type": "string"
            },
            {
                "name": "ram_payer",
                "type": "name"
            }
        ]
    },
    {
        "name": "pair_string_ATOMIC_ATTRIBUTE",
        "base": "",
        "fields": [
            {
                "name": "key",
                "type": "string"
            },
            {
                "name": "value",
                "type": "ATOMIC_ATTRIBUTE"
            }
        ]
    },
    {
        "name": "payofferram",
        "base": "",
        "fields": [
            {
                "name": "payer",
                "type": "name"
            },
            {
                "name": "offer_id",
                "type": "uint64"
            }
        ]
    },
    {
        "name": "remcolauth",
        "base": "",
        "fields": [
            {
                "name": "collection_name",
                "type": "name"
            },
            {
                "name": "account_to_remove",
                "type": "name"
            }
        ]
    },
    {
        "name": "remnotifyacc",
        "base": "",
        "fields": [
            {
                "name": "collection_name",
                "type": "name"
            },
            {
                "name": "account_to_remove",
                "type": "name"
            }
        ]
    },
    {
        "name": "schemas_s",
        "base": "",
        "fields": [
            {
                "name": "schema_name",
                "type": "name"
            },
            {
                "name": "format",
                "type": "FORMAT[]"
            }
        ]
    },
    {
        "name": "setassetdata",
        "base": "",
        "fields": [
            {
                "name": "authorized_editor",
                "type": "name"
            },
            {
                "name": "asset_owner",
                "type": "name"
            },
            {
                "name": "asset_id",
                "type": "uint64"
            },
            {
                "name": "new_mutable_data",
                "type": "ATTRIBUTE_MAP"
            }
        ]
    },
    {
        "name": "setcoldata",
        "base": "",
        "fields": [
            {
                "name": "collection_name",
                "type": "name"
            },
            {
                "name": "data",
                "type": "ATTRIBUTE_MAP"
            }
        ]
    },
    {
        "name": "setmarketfee",
        "base": "",
        "fields": [
            {
                "name": "collection_name",
                "type": "name"
            },
            {
                "name": "market_fee",
                "type": "float64"
            }
        ]
    },
    {
        "name": "setversion",
        "base": "",
        "fields": [
            {
                "name": "new_version",
                "type": "string"
            }
        ]
    },
    {
        "name": "templates_s",
        "base": "",
        "fields": [
            {
                "name": "template_id",
                "type": "int32"
            },
            {
                "name": "schema_name",
                "type": "name"
            },
            {
                "name": "transferable",
                "type": "bool"
            },
            {
                "name": "burnable",
                "type": "bool"
            },
            {
                "name": "max_supply",
                "type": "uint32"
            },
            {
                "name": "issued_supply",
                "type": "uint32"
            },
            {
                "name": "immutable_serialized_data",
                "type": "uint8[]"
            }
        ]
    },
    {
        "name": "tokenconfigs_s",
        "base": "",
        "fields": [
            {
                "name": "standard",
                "type": "name"
            },
            {
                "name": "version",
                "type": "string"
            }
        ]
    },
    {
        "name": "transfer",
        "base": "",
        "fields": [
            {
                "name": "from",
                "type": "name"
            },
            {
                "name": "to",
                "type": "name"
            },
            {
                "name": "asset_ids",
                "type": "uint64[]"
            },
            {
                "name": "memo",
                "type": "string"
            }
        ]
    },
    {
        "name": "withdraw",
        "base": "",
        "fields": [
            {
                "name": "owner",
                "type": "name"
            },
            {
                "name": "token_to_withdraw",
                "type": "asset"
            }
        ]
    }
]
type atomicassets_Actions = {
  "acceptoffer": {
    offer_id:number
  },
  "addcolauth": {
    collection_name:string;
    account_to_add:string
  },
  "addconftoken": {
    token_contract:string;
    token_symbol:string
  },
  "addnotifyacc": {
    collection_name:string;
    account_to_add:string
  },
  "admincoledit": {
    collection_format_extension:{
    
}[]
  },
  "announcedepo": {
    owner:string;
    symbol_to_announce:string
  },
  "backasset": {
    payer:string;
    asset_owner:string;
    asset_id:number;
    token_to_back:string
  },
  "burnasset": {
    asset_owner:string;
    asset_id:number
  },
  "canceloffer": {
    offer_id:number
  },
  "createcol": {
    author:string;
    collection_name:string;
    allow_notify:boolean;
    authorized_accounts:string[];
    notify_accounts:string[];
    market_fee:number;
    data:{
    
}
  },
  "createoffer": {
    sender:string;
    recipient:string;
    sender_asset_ids:number[];
    recipient_asset_ids:number[];
    memo:string
  },
  "createschema": {
    authorized_creator:string;
    collection_name:string;
    schema_name:string;
    schema_format:{
    
}[]
  },
  "createtempl": {
    authorized_creator:string;
    collection_name:string;
    schema_name:string;
    transferable:boolean;
    burnable:boolean;
    max_supply:number;
    immutable_data:{
    
}
  },
  "declineoffer": {
    offer_id:number
  },
  "extendschema": {
    authorized_editor:string;
    collection_name:string;
    schema_name:string;
    schema_format_extension:{
    
}[]
  },
  "forbidnotify": {
    collection_name:string
  },
  "init": {
    
  },
  "locktemplate": {
    authorized_editor:string;
    collection_name:string;
    template_id:number
  },
  "logbackasset": {
    asset_owner:string;
    asset_id:number;
    backed_token:string
  },
  "logburnasset": {
    asset_owner:string;
    asset_id:number;
    collection_name:string;
    schema_name:string;
    template_id:number;
    backed_tokens:string[];
    old_immutable_data:{
    
};
    old_mutable_data:{
    
};
    asset_ram_payer:string
  },
  "logmint": {
    asset_id:number;
    authorized_minter:string;
    collection_name:string;
    schema_name:string;
    template_id:number;
    new_asset_owner:string;
    immutable_data:{
    
};
    mutable_data:{
    
};
    backed_tokens:string[];
    immutable_template_data:{
    
}
  },
  "lognewoffer": {
    offer_id:number;
    sender:string;
    recipient:string;
    sender_asset_ids:number[];
    recipient_asset_ids:number[];
    memo:string
  },
  "lognewtempl": {
    template_id:number;
    authorized_creator:string;
    collection_name:string;
    schema_name:string;
    transferable:boolean;
    burnable:boolean;
    max_supply:number;
    immutable_data:{
    
}
  },
  "logsetdata": {
    asset_owner:string;
    asset_id:number;
    old_data:{
    
};
    new_data:{
    
}
  },
  "logtransfer": {
    collection_name:string;
    from:string;
    to:string;
    asset_ids:number[];
    memo:string
  },
  "mintasset": {
    authorized_minter:string;
    collection_name:string;
    schema_name:string;
    template_id:number;
    new_asset_owner:string;
    immutable_data:{
    
};
    mutable_data:{
    
};
    tokens_to_back:string[]
  },
  "payofferram": {
    payer:string;
    offer_id:number
  },
  "remcolauth": {
    collection_name:string;
    account_to_remove:string
  },
  "remnotifyacc": {
    collection_name:string;
    account_to_remove:string
  },
  "setassetdata": {
    authorized_editor:string;
    asset_owner:string;
    asset_id:number;
    new_mutable_data:{
    
}
  },
  "setcoldata": {
    collection_name:string;
    data:{
    
}
  },
  "setmarketfee": {
    collection_name:string;
    market_fee:number
  },
  "setversion": {
    new_version:string
  },
  "transfer": {
    from:string;
    to:string;
    asset_ids:number[];
    memo:string
  },
  "withdraw": {
    owner:string;
    token_to_withdraw:string
  }
}

export const atomicassets = {
  acceptoffer:(authorization:Authorization[],data:atomicassets_Actions['acceptoffer']):XPRAction<'acceptoffer'>=>({
	account:'atomicassets',
	name:'acceptoffer',
	authorization,
data}),
 addcolauth:(authorization:Authorization[],data:atomicassets_Actions['addcolauth']):XPRAction<'addcolauth'>=>({
	account:'atomicassets',
	name:'addcolauth',
	authorization,
data}),
 addconftoken:(authorization:Authorization[],data:atomicassets_Actions['addconftoken']):XPRAction<'addconftoken'>=>({
	account:'atomicassets',
	name:'addconftoken',
	authorization,
data}),
 addnotifyacc:(authorization:Authorization[],data:atomicassets_Actions['addnotifyacc']):XPRAction<'addnotifyacc'>=>({
	account:'atomicassets',
	name:'addnotifyacc',
	authorization,
data}),
 admincoledit:(authorization:Authorization[],data:atomicassets_Actions['admincoledit']):XPRAction<'admincoledit'>=>({
	account:'atomicassets',
	name:'admincoledit',
	authorization,
data}),
 announcedepo:(authorization:Authorization[],data:atomicassets_Actions['announcedepo']):XPRAction<'announcedepo'>=>({
	account:'atomicassets',
	name:'announcedepo',
	authorization,
data}),
 backasset:(authorization:Authorization[],data:atomicassets_Actions['backasset']):XPRAction<'backasset'>=>({
	account:'atomicassets',
	name:'backasset',
	authorization,
data}),
 burnasset:(authorization:Authorization[],data:atomicassets_Actions['burnasset']):XPRAction<'burnasset'>=>({
	account:'atomicassets',
	name:'burnasset',
	authorization,
data}),
 canceloffer:(authorization:Authorization[],data:atomicassets_Actions['canceloffer']):XPRAction<'canceloffer'>=>({
	account:'atomicassets',
	name:'canceloffer',
	authorization,
data}),
 createcol:(authorization:Authorization[],data:atomicassets_Actions['createcol']):XPRAction<'createcol'>=>({
	account:'atomicassets',
	name:'createcol',
	authorization,
data}),
 createoffer:(authorization:Authorization[],data:atomicassets_Actions['createoffer']):XPRAction<'createoffer'>=>({
	account:'atomicassets',
	name:'createoffer',
	authorization,
data}),
 createschema:(authorization:Authorization[],data:atomicassets_Actions['createschema']):XPRAction<'createschema'>=>({
	account:'atomicassets',
	name:'createschema',
	authorization,
data}),
 createtempl:(authorization:Authorization[],data:atomicassets_Actions['createtempl']):XPRAction<'createtempl'>=>({
	account:'atomicassets',
	name:'createtempl',
	authorization,
data}),
 declineoffer:(authorization:Authorization[],data:atomicassets_Actions['declineoffer']):XPRAction<'declineoffer'>=>({
	account:'atomicassets',
	name:'declineoffer',
	authorization,
data}),
 extendschema:(authorization:Authorization[],data:atomicassets_Actions['extendschema']):XPRAction<'extendschema'>=>({
	account:'atomicassets',
	name:'extendschema',
	authorization,
data}),
 forbidnotify:(authorization:Authorization[],data:atomicassets_Actions['forbidnotify']):XPRAction<'forbidnotify'>=>({
	account:'atomicassets',
	name:'forbidnotify',
	authorization,
data}),
 init:(authorization:Authorization[],data:atomicassets_Actions['init']):XPRAction<'init'>=>({
	account:'atomicassets',
	name:'init',
	authorization,
data}),
 locktemplate:(authorization:Authorization[],data:atomicassets_Actions['locktemplate']):XPRAction<'locktemplate'>=>({
	account:'atomicassets',
	name:'locktemplate',
	authorization,
data}),
 logbackasset:(authorization:Authorization[],data:atomicassets_Actions['logbackasset']):XPRAction<'logbackasset'>=>({
	account:'atomicassets',
	name:'logbackasset',
	authorization,
data}),
 logburnasset:(authorization:Authorization[],data:atomicassets_Actions['logburnasset']):XPRAction<'logburnasset'>=>({
	account:'atomicassets',
	name:'logburnasset',
	authorization,
data}),
 logmint:(authorization:Authorization[],data:atomicassets_Actions['logmint']):XPRAction<'logmint'>=>({
	account:'atomicassets',
	name:'logmint',
	authorization,
data}),
 lognewoffer:(authorization:Authorization[],data:atomicassets_Actions['lognewoffer']):XPRAction<'lognewoffer'>=>({
	account:'atomicassets',
	name:'lognewoffer',
	authorization,
data}),
 lognewtempl:(authorization:Authorization[],data:atomicassets_Actions['lognewtempl']):XPRAction<'lognewtempl'>=>({
	account:'atomicassets',
	name:'lognewtempl',
	authorization,
data}),
 logsetdata:(authorization:Authorization[],data:atomicassets_Actions['logsetdata']):XPRAction<'logsetdata'>=>({
	account:'atomicassets',
	name:'logsetdata',
	authorization,
data}),
 logtransfer:(authorization:Authorization[],data:atomicassets_Actions['logtransfer']):XPRAction<'logtransfer'>=>({
	account:'atomicassets',
	name:'logtransfer',
	authorization,
data}),
 mintasset:(authorization:Authorization[],data:atomicassets_Actions['mintasset']):XPRAction<'mintasset'>=>({
	account:'atomicassets',
	name:'mintasset',
	authorization,
data}),
 payofferram:(authorization:Authorization[],data:atomicassets_Actions['payofferram']):XPRAction<'payofferram'>=>({
	account:'atomicassets',
	name:'payofferram',
	authorization,
data}),
 remcolauth:(authorization:Authorization[],data:atomicassets_Actions['remcolauth']):XPRAction<'remcolauth'>=>({
	account:'atomicassets',
	name:'remcolauth',
	authorization,
data}),
 remnotifyacc:(authorization:Authorization[],data:atomicassets_Actions['remnotifyacc']):XPRAction<'remnotifyacc'>=>({
	account:'atomicassets',
	name:'remnotifyacc',
	authorization,
data}),
 setassetdata:(authorization:Authorization[],data:atomicassets_Actions['setassetdata']):XPRAction<'setassetdata'>=>({
	account:'atomicassets',
	name:'setassetdata',
	authorization,
data}),
 setcoldata:(authorization:Authorization[],data:atomicassets_Actions['setcoldata']):XPRAction<'setcoldata'>=>({
	account:'atomicassets',
	name:'setcoldata',
	authorization,
data}),
 setmarketfee:(authorization:Authorization[],data:atomicassets_Actions['setmarketfee']):XPRAction<'setmarketfee'>=>({
	account:'atomicassets',
	name:'setmarketfee',
	authorization,
data}),
 setversion:(authorization:Authorization[],data:atomicassets_Actions['setversion']):XPRAction<'setversion'>=>({
	account:'atomicassets',
	name:'setversion',
	authorization,
data}),
 transfer:(authorization:Authorization[],data:atomicassets_Actions['transfer']):XPRAction<'transfer'>=>({
	account:'atomicassets',
	name:'transfer',
	authorization,
data}),
 withdraw:(authorization:Authorization[],data:atomicassets_Actions['withdraw']):XPRAction<'withdraw'>=>({
	account:'atomicassets',
	name:'withdraw',
	authorization,
data}) 
} 
type atomicassets_Tables = {
  "assets_s": {
    asset_id:number;
    collection_name:string;
    schema_name:string;
    template_id:number;
    ram_payer:string;
    backed_tokens:string[];
    immutable_serialized_data:number[];
    mutable_serialized_data:number[]
  },
  "balances_s": {
    owner:string;
    quantities:string[]
  },
  "collections_s": {
    collection_name:string;
    author:string;
    allow_notify:boolean;
    authorized_accounts:string[];
    notify_accounts:string[];
    market_fee:number;
    serialized_data:number[]
  },
  "config_s": {
    asset_counter:number;
    template_counter:number;
    offer_counter:number;
    collection_format:{
    
}[];
    supported_tokens:{
    
}[]
  },
  "offers_s": {
    offer_id:number;
    sender:string;
    recipient:string;
    sender_asset_ids:number[];
    recipient_asset_ids:number[];
    memo:string;
    ram_payer:string
  },
  "schemas_s": {
    schema_name:string;
    format:{
    
}[]
  },
  "templates_s": {
    template_id:number;
    schema_name:string;
    transferable:boolean;
    burnable:boolean;
    max_supply:number;
    issued_supply:number;
    immutable_serialized_data:number[]
  },
  "tokenconfigs_s": {
    standard:string;
    version:string
  }
}


    export type Authorization = {
      actor: string;
      permission: "active"|"owner"|string;
  }

    export type XPRAction<A extends keyof (atomicassets_Actions)>={
      account: 'atomicassets';
      name: A;
      authorization: Authorization[];
      data: atomicassets_Actions[A]; 
    }
  
export type Tables<TableName extends keyof (atomicassets_Tables)> = atomicassets_Tables[TableName];
export type Actions<ActionName extends keyof (atomicassets_Actions)> = atomicassets_Actions[ActionName];
export function atomicassets_actionParams<ActionName extends keyof (atomicassets_Actions)>(actionPrams: atomicassets_Actions[ActionName]):(object|number|string |number[]|string[])[]{return Object.values(actionPrams)}
