// Type definitions for Mongoose 5.5.1
// Project: http://mongoosejs.com/
// Definitions by: horiuchi <https://github.com/horiuchi>
//                 lukasz-zak <https://github.com/lukasz-zak>
//                 Alorel <https://github.com/Alorel>
//                 jendrikw <https://github.com/jendrikw>
//                 Ethan Resnick <https://github.com/ethanresnick>
//                 vologa <https://github.com/vologab>
//                 jussikinnula <https://github.com/jussikinnula>
//                 ondratra <https://github.com/ondratra>
//                 alfirin <https://github.com/alfirin>
//                 Idan Dardikman <https://github.com/idandrd>
//                 Dominik Heigl <https://github.com/various89>
//                 Fazendaaa <https://github.com/Fazendaaa>
//                 Norman Perrin <https://github.com/NormanPerrin>
//                 Dan Manastireanu <https://github.com/danmana>
//                 stablio <https://github.com/stablio>
//                 Emmanuel Gautier <https://github.com/emmanuelgautier>
//                 Frontend Monster <https://github.com/frontendmonster>
//                 Ming Chen <https://github.com/mingchen>
//                 Olga Isakova <https://github.com/penumbra1>
//                 Orblazer <https://github.com/orblazer>
//                 HughKu <https://github.com/HughKu>
//                 Erik Lopez <https://github.com/niuware>
//                 Vlad Melnik <https://github.com/vladmel1234>
//                 Jarom Loveridge <https://github.com/jloveridge>
//                 Grimmer Kang <https://github.com/grimmer0125>
//                 Richard Davison <https://github.com/richarddd>
//                 Brian Chen <https://github.com/ToucheSir>
//                 Boris Figovsky <https://github.com/borfig>
//                 Richard Bateman <https://github.com/taxilian>
// Definitions: https://github.com/alttypes/mongoose
// TypeScript Version: 3.7

/// <reference types="mongodb" />
/// <reference types="node" />
/// <reference types="advanced-type-tests" />


/*
 * Guidelines for maintaining these definitions:
 * - If you spot an error here or there, please submit a PR.
 *   Give some examples/links to documentation if you can.
 *
 * For patches and minor releases:
 * - Browse the changelog at https://github.com/Automattic/mongoose/blob/master/History.md
 *   and make necessary changes. Afterwards, update the version number at the top so we know
 *   which version we are on.
 *
 * For major releases:
 * - Refer to the updated docs at https//mongoosejs.com/docs/api.html
 * - On the left-hand side of the docs is a list of .js files. Reset and update the TODO list below
 *   then go through one-by-one, making any updates to params list, return type, etc. For documentation
 *   changes just copy/paste them into here.
 * - Check the files off as you go. Some files below might not have anything in them. That's ok, this
 *   is just a simple heuristic to keep track of our progress.
 */

/*
For easier searching, add a header to each section like so:
To find a section, CTRL+F and type "section ___.js"
/*
 * section filename.js
 * http://mongoosejs.com/docs/api.html#filename-js
 */

declare module "mongoose" {
    import events = require('events');
    import mongodb = require('mongodb');
    import stream = require('stream');
    import mongoose = require('mongoose');

    /**
     * This is used by the unit tests at the bottom of the file
     * which test to make sure the advanced types all work
     */
    import {UnitTests as AUT} from 'advanced-type-tests';
    /**
     * Gets and optionally overwrites the function used to pluralize collection names
     * @param fn function to use for pluralization of collection names
     * @returns the current function used to pluralize collection names (defaults to the `mongoose-legacy-pluralize` module's function)
     */
    export function pluralize(fn?: (str: string) => string): (str: string) => string;

    /*
     * Some mongoose classes have the same name as the native JS classes
     * Keep references to native classes using a "Native" prefix
     */
    class NativeBuffer extends global.Buffer { }
    class NativeDate extends global.Date { }
    class NativeError extends global.Error { }

    /*
     * section index.js
     * http://mongoosejs.com/docs/api.html#index-js
     */
    export var DocumentProvider: any;
    // recursive constructor
    export var Mongoose: new (...args: any[]) => typeof mongoose;
    type Mongoose = typeof mongoose;
    export var SchemaTypes: typeof Schema.Types;

    /** Expose connection states for user-land */
    export var STATES: ConnectionStates;
    /** The default connection of the mongoose module. */
    export var connection: Connection;
    /** An array containing all connections associated with this Mongoose instance. */
    export var connections: Connection[];
    /** Models registred on the default mongoose connection. */
    export var models: { [index: string]: Model<any> };
    /** The node-mongodb-native driver Mongoose uses. */
    export var mongo: typeof mongodb;
    /** The Mongoose version */
    export var version: string;

    export type FilterQuery<T> = mongodb.Filter<LooseType<T>>;

    /**
     * Opens the default mongoose connection.
     * Options passed take precedence over options included in connection strings.
     * @returns pseudo-promise wrapper around this
     */
    export function connect(uris: string, options: ConnectionOptions, callback: (err: mongodb.MongoError) => void): Promise<Mongoose>;
    export function connect(uris: string, callback: (err: mongodb.MongoError) => void): Promise<Mongoose>;
    export function connect(uris: string, options?: ConnectionOptions): Promise<Mongoose>;

    /**
     * Creates a Connection instance.
     * Each connection instance maps to a single database. This method is helpful
     *   when mangaging multiple db connections.
     * @param uri a mongodb:// URI
     * @param options options to pass to the driver
     * @returns the created Connection object
     */
    export function createConnection(): Connection;
    export function createConnection(uri: string,
      options?: ConnectionOptions
    ): Connection & {
      then: Promise<Connection>["then"];
      catch: Promise<Connection>["catch"];
    };

    /**
     * Disconnects all connections.
     * @param fn called after all connection close.
     */
    export function disconnect(fn: (error?: any) => void): void;
    /** Disconnects all connections. */
    export function disconnect(): Promise<void>;

    /** Gets mongoose options */
    export function get(key: string): any;

    /**
     * Defines a model or retrieves it.
     * Models defined on the mongoose instance are available to all connection
     *   created by the same mongoose instance.
     * @param name model name
     * @param collection (optional, induced from model name)
     * @param skipInit whether to skip initialization (defaults to false)
     */
    export function model<T extends Document>(name: string, schema?: Schema, collection?: string,
      skipInit?: boolean): Model<T>;
    export function model<T extends Document, U extends Model<T>>(
      name: string,
      schema?: Schema,
      collection?: string,
      skipInit?: boolean
    ): U;

    /**
     * Returns an array of model names created on this instance of Mongoose.
     * Does not include names of models created using connection.model().
     */
    export function modelNames(): string[];

    /**
     * Declares a global plugin executed on all Schemas.
     * Equivalent to calling .plugin(fn) on each Schema you create.
     * @param fn plugin callback
     * @param opts optional options
     */
    export function plugin(fn: Function): typeof mongoose;
    export function plugin<T>(fn: Function, opts: T): typeof mongoose;

    /** Sets mongoose options */
    export function set(key: string, value: any): void;

    export function startSession(options?: mongodb.ClientSessionOptions, cb?: (err: any, session: mongodb.ClientSession) => void): Promise<mongodb.ClientSession>;

    export type CastError = Error.CastError;

    /*
     * section connection.js
     * http://mongoosejs.com/docs/api.html#connection-js
     *
     * The Connection class exposed by require('mongoose')
     *   is actually the driver's NativeConnection class.
     *   connection.js defines a base class that the native
     *   versions extend. See:
     *   http://mongoosejs.com/docs/api.html#drivers-node-mongodb-native-connection-js
     */
    abstract class ConnectionBase extends events.EventEmitter {
      /**
       * For practical reasons, a Connection equals a Db.
       * @param base a mongoose instance
       * @event connecting Emitted when connection.{open,openSet}() is executed on this connection.
       * @event connected Emitted when this connection successfully connects to the db. May be emitted multiple times in reconnected scenarios.
       * @event open Emitted after we connected and onOpen is executed on all of this connections models.
       * @event disconnecting Emitted when connection.close() was executed.
       * @event disconnected Emitted after getting disconnected from the db.
       * @event close Emitted after we disconnected and onClose executed on all of this connections models.
       * @event reconnected Emitted after we connected and subsequently disconnected, followed by successfully another successfull connection.
       * @event error Emitted when an error occurs on this connection.
       * @event fullsetup Emitted in a replica-set scenario, when primary and at least one seconaries specified in the connection string are connected.
       * @event all Emitted in a replica-set scenario, when all nodes specified in the connection string are connected.
       */
      constructor(base: typeof mongoose);

      /**
      * Opens the connection to MongoDB.
      * @param uri mongodb connection string
      * @param options Mongoose forces the db option forceServerObjectId false and cannot be overridden.
      *   Mongoose defaults the server auto_reconnect options to true which can be overridden.
      *   See the node-mongodb-native driver instance for options that it understands.
      *   Options passed take precedence over options included in connection strings.
      */
      openUri(uri: string, options?: ConnectionOptions): Promise<Connection>;
      openUri(uri: string, callback: (err: any, conn?: Connection) => void): Connection;
      openUri(
          uri: string,
          options: ConnectionOptions,
          callback?: (err: any, conn?: Connection) => void
      ): Connection & {
          then: Promise<Connection>["then"];
          catch: Promise<Connection>["catch"];
        };

      /** The password specified in the URI */
      pass: string;

      /**
       * The port portion of the URI. If multiple hosts, such as a replica set,
       * this will contain the port from the first host name in the URI.
       */
      port: number;

      /** Declares a plugin executed on all schemas you pass to `conn.model()` */
      plugin(fn: (schema: Schema, opts?: any) => void, opts?: any): Connection;

      /** The plugins that will be applied to all models created on this connection. */
      plugins: Array<any>;

      /** Helper for dropDatabase() */
      dropDatabase(callback?: (err: any) => void): Promise<any>;

      /** Helper for creating a collection */
      createCollection<T = any>(name: string, options?: mongodb.CreateCollectionOptions): Promise<mongodb.Collection<T>>;
      createCollection<T = any>(name: string, cb: (err: any, collection: mongodb.Collection<T>) => void): Promise<void>;
      createCollection<T = any>(name: string, options: mongodb.CreateCollectionOptions, cb?: (err: any, collection: mongodb.Collection) => void): Promise<mongodb.Collection<T>>;

      /** Helper for dropCollection() */
      dropCollection(name: string, callback?: (err: any) => void): Promise<void>;

      /** Closes the connection */
      close(callback?: (err: any) => void): Promise<void>;

      /** Closes the connection */
      close(force?: boolean, callback?: (err: any) => void): Promise<void>;

      /**
       * Retrieves a collection, creating it if not cached.
       * Not typically needed by applications. Just talk to your collection through your model.
       * @param name name of the collection
       * @param options optional collection options
       */
      collection(name: string, options?: any): Collection;

      /**
       * Defines or retrieves a model.
       * When no collection argument is passed, Mongoose produces a collection name by passing
       * the model name to the utils.toCollectionName method. This method pluralizes the name.
       * If you don't like this behavior, either pass a collection name or set your schemas
       * collection name option.
       * @param name the model name
       * @param schema a schema. necessary when defining a model
       * @param collection name of mongodb collection (optional) if not given it will be induced from model name
       * @returns The compiled model
       */
      model<T extends Document>(name: string, schema?: Schema, collection?: string): Model<T>;
      model<T extends Document, U extends Model<T>>(
        name: string,
        schema?: Schema,
        collection?: string
      ): U;

      /**
       * Removes the model named `name` from this connection, if it exists. You can
       * use this function to clean up any models you created in your tests to
       * prevent OverwriteModelErrors.
       *
       * @param name if string, the name of the model to remove. If regexp, removes all models whose name matches the regexp.
       * @returns this
       */
      deleteModel(name: string | RegExp): Connection;

      /** Returns an array of model names created on this connection. */
      modelNames(): string[];

      /** A hash of the global options that are associated with this connection */
      config: any;

      /** The mongodb.Db instance, set when the connection is opened */
      db: mongodb.Db;

      /** A hash of the collections associated with this connection */
      collections: { [index: string]: Collection };

      /** A hash of models registered with this connection */
      models: { [index: string]: Model<any> };

      /**
       * Returns the [MongoDB driver `MongoClient`](http://mongodb.github.io/node-mongodb-native/3.5/api/MongoClient.html) instance
       * that this connection uses to talk to MongoDB.
       */
      getClient(): mongodb.MongoClient;

       /**
        * The host name portion of the URI. If multiple hosts, such as a replica set,
        * this will contain the first host name in the URI
        */
      host: string;

       /**
        * A number identifier for this connection. Used for debugging when
        * you have [multiple connections](/docs/connections.html#multiple_connections).
        */
      id: number;

      /**
       * Connection ready state
       * 0 = disconnected
       * 1 = connected
       * 2 = connecting
       * 3 = disconnecting
       * Each state change emits its associated event name.
       */
      readyState: number;

      /** mapping of ready states */
      states: ConnectionStates;

      /** Watches the entire underlying database for changes. Similar to [`Model.watch()`](/docs/api/model.html#model_Model.watch). */
      watch(pipeline?: Array<any>, options?: mongodb.ChangeStreamOptions): mongodb.ChangeStream;
    }

    /**
     * Connection optional settings.
     *
     * see
     *   https://mongoosejs.com/docs/api.html#mongoose_Mongoose-connect
     * and
     *   http://mongodb.github.io/node-mongodb-native/3.0/api/MongoClient.html
     * for all available options.
     *
     */
    interface ConnectionOptions extends mongodb.MongoClientOptions {
      /** Set to false to [disable buffering](http://mongoosejs.com/docs/faq.html#callback_never_executes) on all models associated with this connection. */
      bufferCommands?: boolean;
      /** The name of the database you want to use. If not provided, Mongoose uses the database name from connection string. */
      dbName?: string;
      /** username for authentication, equivalent to `options.auth.user`. Maintained for backwards compatibility. */
      user?: string;
      /** password for authentication, equivalent to `options.auth.password`. Maintained for backwards compatibility. */
      pass?: string;
      /** Set to false to disable automatic index creation for all models associated with this connection. */
      autoIndex?: boolean;
      /** True by default. Set to `false` to make `findOneAndUpdate()` and `findOneAndRemove()` use native `findOneAndUpdate()` rather than `findAndModify()`. */
      useFindAndModify?: boolean;
      /** Set to `true` to make Mongoose automatically call `createCollection()` on every model created on this connection. */
      autoCreate?: boolean;
      /** False by default. If `true`, this connection will use `createIndex()` instead of `ensureIndex()` for automatic index builds via `Model.init()`. */
      useCreateIndex?: boolean;
      /** false by default. Set to `true` to make all connections set the `useNewUrlParser` option by default */
      useNewUrlParser?: boolean;
      /** false by default. Set to `true` to make all connections set the `useUnifiedTopology` option by default */
      useUnifiedTopology?: boolean;
    }

    interface ClientSession extends mongodb.ClientSession { }

    /*
     * section drivers/node-mongodb-native/collection.js
     * http://mongoosejs.com/docs/api.html#drivers-node-mongodb-native-collection-js
     */
    var Collection: Collection;
    interface Collection extends CollectionBase {
      /**
       * Collection constructor
       * @param name name of the collection
       * @param conn A MongooseConnection instance
       * @param opts optional collection options
       */
      new(name: string, conn: Connection, opts?: any): Collection;
      /** Formatter for debug print args */
      $format(arg: any): string;
      /** Debug print helper */
      $print(name: any, i: any, args: any[]): void;
      /** Retrieves information about this collections indexes. */
      getIndexes(): any;
    }

    /*
     * section drivers/node-mongodb-native/connection.js
     * http://mongoosejs.com/docs/api.html#drivers-node-mongodb-native-connection-js
     */
    class Connection extends ConnectionBase {
      /**
       * Switches to a different database using the same connection pool.
       * @param name The database name
       * @returns New Connection Object
       */
      useDb(name: string): Connection;

      startSession(options?: mongodb.ClientSessionOptions, cb?: (err: any, session: mongodb.ClientSession) => void): Promise<mongodb.ClientSession>;

      /** Expose the possible connection states. */
      static STATES: ConnectionStates;
    }

    export enum ConnectionStates {
      disconnected = 0,
      connected = 1,
      connecting = 2,
      disconnecting = 3,
      uninitialized = 99,
    }

    /*
     * section error.js
     * http://mongoosejs.com/docs/api.html#error-js
     */
    class Error extends global.Error {

      // "MongooseError" for instances of the current class,
      // an other string for instances of derived classes.
      name: "MongooseError" | string;

      /**
       * MongooseError constructor
       * @param msg Error message
       */
      constructor(msg: string);

      /**
       * The default built-in validator error messages. These may be customized.
       * As you might have noticed, error messages support basic templating
       * {PATH} is replaced with the invalid document path
       * {VALUE} is replaced with the invalid value
       * {TYPE} is replaced with the validator type such as "regexp", "min", or "user defined"
       * {MIN} is replaced with the declared min value for the Number.min validator
       * {MAX} is replaced with the declared max value for the Number.max validator
       */
      static messages: any;

      /** For backwards compatibility. Same as mongoose.Error.messages */
      static Messages: any;

    }

    module Error {

      /**
       * section error/notFound.js
       * https://mongoosejs.com/docs/api.html#mongooseerror_MongooseError.DocumentNotFoundError
       *
       * An instance of this error class will be returned when `save()` fails
       * because the underlying
       * document was not found. The constructor takes one parameter, the
       * conditions that mongoose passed to `update()` when trying to update
       * the document.
       */
      export class DocumentNotFoundError extends Error {
        name: 'DocumentNotFoundError';
        filter: any;
        query: any;
        constructor(filter: any);
      }

      /**
       * section error/cast.js
       * https://mongoosejs.com/docs/api.html#mongooseerror_MongooseError.CastError
       *
       * An instance of this error class will be returned when mongoose failed to
       * cast a value.
       */
      export class CastError extends Error {
        name: 'CastError';
        stringValue: string;
        kind: string;
        value: any;
        path: string;
        reason?: any;
        model?: any;

        constructor(type: string, value: any, path: string, reason?: NativeError);

        setModel(model: any): void;
      }

      /**
       * section error/validation.js
       * https://mongoosejs.com/docs/api.html#mongooseerror_MongooseError.ValidationError

       * An instance of this error class will be returned when [validation](/docs/validation.html) failed.
       * The `errors` property contains an object whose keys are the paths that failed and whose values are
       * instances of CastError or ValidationError.
       *
       */
      export class ValidationError extends Error {
        name: 'ValidationError';

        errors: {[path: string]: ValidatorError | CastError};

        constructor(instance?: MongooseDocument<any>);

        /** Console.log helper */
        toString(): string;

        inspect(): object;

        toJSON(): object;

        addError(path: string, error: any): void;
      }

      /**
       * section error/validator.js
       * https://mongoosejs.com/docs/api.html#mongooseerror_MongooseError.ValidatorError
       *
       * A `ValidationError` has a hash of `errors` that contain individual `ValidatorError` instances
       */
      export class ValidatorError extends Error {
        name: 'ValidatorError';
        properties: {message: string, type?: string, path?: string, value?: any, reason?: any};
        kind: string;
        path: string;
        value: any;
        reason: any;

        constructor(properties: {message?: string, type?: string, path?: string, value?: any, reason?: any});

        formatMessage(msg: string | Function, properties: any): string;

        toString(): string;
      }

      /**
       * section error/version.js
       * https://mongoosejs.com/docs/api.html#mongooseerror_MongooseError.VersionError
       *
       * An instance of this error class will be returned when you call `save()` after
       * the document in the database was changed in a potentially unsafe way. See
       * the [`versionKey` option](http://mongoosejs.com/docs/guide.html#versionKey) for more information.
       */
      export class VersionError extends Error {
        name: 'VersionError';
        version: any;
        modifiedPaths: Array<any>;

        constructor(doc: MongooseDocument<any>, currentVersion: any, modifiedPaths: any);
      }

      /**
       * section error/parallelSave.js
       * https://mongoosejs.com/docs/api.html#mongooseerror_MongooseError.ParallelSaveError
       *
       * An instance of this error class will be returned when you call `save()` multiple
       * times on the same document in parallel. See the [FAQ](http://mongoosejs.com/docs/faq.html) for more
       * information.
       */
      export class ParallelSaveError extends Error {
        name: 'ParallelSaveError';
        constructor(doc: MongooseDocument<any>);
      }

      /**
       * section error/overwriteModel.js
       * https://mongoosejs.com/docs/api.html#mongooseerror_MongooseError.OverwriteModelError
       *
       * Thrown when a model with the given name was already registered on the connection.
       * See [the FAQ about `OverwriteModelError`](http://mongoosejs.com/docs/faq.html#overwrite-model-error).
       */
      export class OverwriteModelError extends Error {
        name: 'OverwriteModelError';
        constructor(name: string);
      }

      /**
       * section error/missingSchema.js
       * https://mongoosejs.com/docs/api.html#mongooseerror_MongooseError.MissingSchemaError
       *
       * Thrown when you try to access a model that has not been registered yet
       */
      export class MissingSchemaError extends Error {
        name: 'MissingSchemaError';
        constructor(name: string);
      }

      /**
       * section error/divergentArray.js
       * https://mongoosejs.com/docs/api.html#mongooseerror_MongooseError.DivergentArrayError
       *
       * An instance of this error will be returned if you used an array projection
       * and then modified the array in an unsafe way.
       */
      export class DivergentArrayError extends Error {
        name: 'DivergentArrayError';
        constructor(paths: Array<any>);
      }
    }

    interface EachAsyncOptions {
      /** defaults to 1 */
      parallel?: number;
    }

    /*
     * section querycursor.js
     * https://mongoosejs.com/docs/api.html#querycursor-js
     *
     * Callback signatures are from: https://mongodb.github.io/node-mongodb-native/2.1/api/Cursor.html#close
     * QueryCursor can only be accessed by query#cursor(), we only
     *   expose its interface to enable type-checking.
     */
    interface QueryCursor<T extends Document> extends stream.Readable {
      /**
       * A QueryCursor is a concurrency primitive for processing query results
       * one document at a time. A QueryCursor fulfills the Node.js streams3 API,
       * in addition to several other mechanisms for loading documents from MongoDB
       * one at a time.
       * Unless you're an advanced user, do not instantiate this class directly.
       * Use Query#cursor() instead.
       * @param options query options passed to .find()
       * @event cursor Emitted when the cursor is created
       * @event error Emitted when an error occurred
       * @event data Emitted when the stream is flowing and the next doc is ready
       * @event end Emitted when the stream is exhausted
       */
      constructor(query: Query<T>, options: any): QueryCursor<T>;

      /** Marks this cursor as closed. Will stop streaming and subsequent calls to next() will error. */
      close(callback?: (error: any, result: any) => void): Promise<any>;

      /**
       * Execute fn for every document in the cursor. If fn returns a promise,
       * will wait for the promise to resolve before iterating on to the next one.
       * Returns a promise that resolves when done.
       * @param fn Function to be executed for every document in the cursor
       * @param callback Executed when all docs have been processed
       */
      eachAsync(fn: (doc: T) => any, callback?: (err: any) => void): Promise<T>;

      /**
       * Execute fn for every document in the cursor. If fn returns a promise,
       * will wait for the promise to resolve before iterating on to the next one.
       * Returns a promise that resolves when done.
       * @param fn Function to be executed for every document in the cursor
       * @param options Async options (e. g. parallel function execution)
       * @param callback Executed when all docs have been processed
       */
      eachAsync(fn: (doc: T) => any, options: EachAsyncOptions, callback?: (err: any) => void): Promise<T>;

      /**
       * Registers a transform function which subsequently maps documents retrieved
       * via the streams interface or .next()
       */
      map(fn: (doc: T) => T): this;

      /**
       * Get the next document from this cursor. Will return null when there are
       * no documents left.
       */
      next(callback?: (err: any, doc?: T) => void): Promise<any>;
    }

    /*
     * section virtualtype.js
     * http://mongoosejs.com/docs/api.html#virtualtype-js
     */
    class VirtualType {
      /** This is what mongoose uses to define virtual attributes via Schema.prototype.virtual. */
      constructor(options: any, name: string);
      /** Applies getters to value using optional scope. */
      applyGetters(value: any, scope: any): any;
      /** Applies setters to value using optional scope. */
      applySetters(value: any, scope: any): any;
      /** Defines a getter. */
      get(fn: Function): this;
      /** Defines a setter. */
      set(fn: Function): this;
    }

    /*
     * section schema.js
     * http://mongoosejs.com/docs/api.html#schema-js
     */
    class Schema<T = any> extends events.EventEmitter {
      /**
       * Schema constructor.
       * When nesting schemas, (children in the example above), always declare
       * the child schema first before passing it into its parent.
       * @event init Emitted after the schema is compiled into a Model.
       */
      constructor(definition?: SchemaDefinition, options?: SchemaOptions);

      /** Adds key path / schema type pairs to this schema. */
      add(obj: SchemaDefinition, prefix?: string): void;

      /** Return a deep copy of this schema */
      clone(): Schema;

      /**
       * Iterates the schemas paths similar to Array.forEach.
       * @param fn callback function
       * @returns this
       */
      eachPath(fn: (path: string, type: SchemaType) => void): this;

      /**
       * Gets a schema option.
       * @param key option name
       */
      get(key: string): any;

      /**
       * Defines an index (most likely compound) for this schema.
       * @param options Options to pass to MongoDB driver's createIndex() function
       * @param options.expires Mongoose-specific syntactic sugar, uses ms to convert
       *   expires option into seconds for the expireAfterSeconds in the above link.
       */
      index(fields: any, options?: {
        expires?: string;
        [other: string]: any;
      }): this;

      /** Compiles indexes from fields and schema-level indexes */
      indexes(): any[];

      /**
       * Loads an ES6 class into a schema. Maps setters + getters, static methods, and
       * instance methods to schema virtuals, statics, and methods.
       */
      loadClass(model: Function): this;

      /**
       * Adds an instance method to documents constructed from Models compiled from this schema.
       * If a hash of name/fn pairs is passed as the only argument, each name/fn pair will be added as methods.
       */
      method<F extends keyof T>(method: F, fn: T[F]): this;
      method(methodObj: {
        [F in keyof T]: T[F]
      }): this;

      /**
       * Gets/sets schema paths.
       * Sets a path (if arity 2)
       * Gets a path (if arity 1)
       */
      path(path: string): SchemaType;
      path(path: string, constructor: any): this;

      /**
       * Returns the pathType of path for this schema.
       * @returns whether it is a real, virtual, nested, or ad-hoc/undefined path.
       */
      pathType(path: string): string;

      /**
       * Registers a plugin for this schema.
       * @param plugin callback
       */
      plugin(plugin: (schema: Schema) => void): this;
      plugin<T>(plugin: (schema: Schema, options: T) => void, opts: T): this;

      /**
       * Defines a post hook for the document
       * Post hooks fire on the event emitted from document instances of Models compiled
       *   from this schema.
       * @param method name of the method to hook
       * @param fn callback
       */
      post<T extends Document>(method: string | RegExp, fn: (
        doc: T, next: (err?: NativeError) => void
      ) => void): this;

      post<T extends Document>(method: string | RegExp, fn: (
        error: mongodb.MongoError, doc: T, next: (err?: NativeError) => void
      ) => void): this;

      /**
       * Defines a pre hook for the document.
       */
      pre<T extends Document = Document>(
        method: "init" | "validate" | "save" | "remove",
        fn: HookSyncCallback<T>,
        errorCb?: HookErrorCallback
      ): this;
      pre<T extends Query<any> = Query<any>>(
        method:
          | "count"
          | "find"
          | "findOne"
          | "findOneAndRemove"
          | "findOneAndUpdate"
          | "update"
          | "updateOne"
          | "updateMany",
        fn: HookSyncCallback<T>,
        errorCb?: HookErrorCallback
      ): this;
      pre<T extends Aggregate<any> = Aggregate<any>>(
        method: "aggregate",
        fn: HookSyncCallback<T>,
        errorCb?: HookErrorCallback
      ): this;
      pre<T extends Model<Document> = Model<Document>>(
        method: "insertMany",
        fn: HookSyncCallback<T>,
        errorCb?: HookErrorCallback
      ): this;
      pre<T extends Document | Model<Document> | Query<any> | Aggregate<any>>(
        method: string,
        fn: HookSyncCallback<T>,
        errorCb?: HookErrorCallback
      ): this;

      pre<T extends Document = Document>(
        method: "init" | "validate" | "save" | "remove",
        parallel: boolean,
        fn: HookAsyncCallback<T>,
        errorCb?: HookErrorCallback
      ): this;
      pre<T extends Query<any> = Query<any>>(
        method:
          | "count"
          | "find"
          | "findOne"
          | "findOneAndRemove"
          | "findOneAndUpdate"
          | "update"
          | "updateOne"
          | "updateMany",
        parallel: boolean,
        fn: HookAsyncCallback<T>,
        errorCb?: HookErrorCallback
      ): this;
      pre<T extends Aggregate<any> = Aggregate<any>>(
        method: "aggregate",
        parallel: boolean,
        fn: HookAsyncCallback<T>,
        errorCb?: HookErrorCallback
      ): this;
      pre<T extends Model<Document> = Model<Document>>(
        method: "insertMany",
        parallel: boolean,
        fn: HookAsyncCallback<T>,
        errorCb?: HookErrorCallback
      ): this;
      pre<T extends Document | Model<Document> | Query<any> | Aggregate<any>>(
        method: string | RegExp,
        parallel: boolean,
        fn: HookAsyncCallback<T>,
        errorCb?: HookErrorCallback
      ): this;

      /**
       * Adds a method call to the queue.
       * @param name name of the document method to call later
       * @param args arguments to pass to the method
       */
      queue(name: string, args: any[]): this;

      /**
       * Removes the given path (or [paths]).
       */
      remove(path: string | string[]): void;

      /**
       * @param invalidate refresh the cache
       * @returns an Array of path strings that are required by this schema.
       */
      requiredPaths(invalidate?: boolean): string[];

      /**
       * Sets/gets a schema option.
       * @param key option name
       * @param value if not passed, the current option value is returned
       */
      set<T extends keyof SchemaOptions>(key: T): SchemaOptions[T];
      set<T extends keyof SchemaOptions>(key: T, value: SchemaOptions[T]): this;

      /**
       * Adds static "class" methods to Models compiled from this schema.
       */
      static(name: string, fn: Function): this;
      static(nameObj: { [name: string]: Function }): this;

      /** Creates a virtual type with the given name. */
      virtual(name: string, options?: any): VirtualType;

      /** Returns the virtual type with the given name. */
      virtualpath(name: string): VirtualType;

      /** The allowed index types */
      static indexTypes: string[];

      /**
       * Reserved document keys.
       * Keys in this object are names that are rejected in schema declarations
       * b/c they conflict with mongoose functionality. Using these key name
       * will throw an error.
       */
      static reserved: any;

      /** Object of currently defined methods on this schema. */
      methods: {
        [F in keyof T]: T[F]
      };
      /** Object of currently defined statics on this schema. */
      statics: any;
      /** Object of currently defined query helpers on this schema. */
      query: any;
      /** The original object passed to the schema constructor */
      obj: any;
    }

    // Hook functions: https://github.com/vkarpov15/hooks-fixed
    interface HookSyncCallback<T> {
      (this: T, next: HookNextFunction, docs: any[]): Promise<any> | void;
    }

    interface HookAsyncCallback<T> {
      (this: T, next: HookNextFunction, done: HookDoneFunction, docs: any[]): Promise<any> | void;
    }

    interface HookErrorCallback {
      (error?: Error): any;
    }

    interface HookNextFunction {
      (error?: Error): any;
    }

    interface HookDoneFunction {
      (error?: Error): any;
    }

    interface SchemaOptions {
      /** defaults to false (which means use the connection's autoIndex option) */
      autoIndex?: boolean;
      /** defaults to true */
      bufferCommands?: boolean;
      /** defaults to false */
      capped?: boolean | number | { size?: number; max?: number; autoIndexId?: boolean; };
      /** Sets a default collation for every query and aggregation. */
      collation?: CollationOptions;
      /** no default */
      collection?: string;
      /** defaults to "__t" */
      discriminatorKey?: string;
      /** defaults to false. */
      emitIndexErrors?: boolean;
      excludeIndexes?: any;
      /** defaults to true */
      id?: boolean;
      /** defaults to true */
      _id?: boolean;
      /** controls document#toObject behavior when called manually - defaults to true */
      minimize?: boolean;
      read?: string;
      writeConcern?: WriteConcern;
      /** defaults to true. */
      safe?: boolean | { w?: number | string; wtimeout?: number; j?: boolean };

      /** defaults to null */
      shardKey?: object;
      /** defaults to true */
      strict?: boolean | 'throw';
      /** no default */
      toJSON?: DocumentToObjectOptions;
      /** no default */
      toObject?: DocumentToObjectOptions;
      /** defaults to 'type' */
      typeKey?: string;
      /** defaults to false */
      useNestedStrict?: boolean;
      /** defaults to false */
      usePushEach?: boolean;
      /** defaults to true */
      validateBeforeSave?: boolean;
      /** defaults to "__v" */
      versionKey?: string | boolean;
      /**
       * By default, Mongoose will automatically
       * select() any populated paths.
       * To opt out, set selectPopulatedPaths to false.
       */
      selectPopulatedPaths?: boolean;
      /**
       * skipVersioning allows excluding paths from
       * versioning (the internal revision will not be
       * incremented even if these paths are updated).
       */
      skipVersioning?: any;
      /**
       * Validation errors in a single nested schema are reported
       * both on the child and on the parent schema.
       * Set storeSubdocValidationError to false on the child schema
       * to make Mongoose only report the parent error.
       */
      storeSubdocValidationError?: boolean;
      /**
       * If set timestamps, mongoose assigns createdAt
       * and updatedAt fields to your schema, the type
       * assigned is Date.
       */
      timestamps?: boolean | SchemaTimestampsConfig;
    }

    interface SchemaTimestampsConfig {
      createdAt?: boolean | string;
      updatedAt?: boolean | string;
    }

    /*
     * Intellisense for Schema definitions
     */
    interface SchemaDefinition {
      [path: string]: SchemaTypeOpts<any> | Schema | SchemaType;
    }

    /*
     * The standard options available when configuring a schema type:
     * new Schema({
     *   name: {
     *     type: String,
     *     required: true,
     *     ...
     *   }
     * });
     *
     * Note: the properties have Object as a fallback type: | Object
     *   because this interface does not apply to a schematype that
     *   does not have a type property. Ex:
     * new Schema({
     *   name: {
     *     first: String,    // since name does not have a "type" property
     *     last: String      //   first and last can have any valid type
     *     ...
     *   }
     * });
     *
     * References:
     * - http://mongoosejs.com/docs/schematypes.html
     * - http://mongoosejs.com/docs/api.html#schema_Schema.Types
     */
    interface SchemaTypeOpts<T> {
      alias?: string;

      /* Common Options for all schema types */
      type?: T;

      /** Sets a default value for this SchemaType. */
      default?: SchemaTypeOpts.DefaultFn<T> | T;

      /**
       * Getters allow you to transform the representation of the data as it travels
       * from the raw mongodb document to the value that you see.
       */
      get?: (value: T, schematype?: this) => T | any;

      /** Declares the index options for this schematype. */
      index?: SchemaTypeOpts.IndexOpts | boolean | string;

      /**
       * Adds a required validator to this SchemaType. The validator gets added
       * to the front of this SchemaType's validators array using unshift().
       */
      required?: SchemaTypeOpts.RequiredFn<T> |
      boolean | [boolean, string] |
      string | [string, string] |
      any;

      /**
       * Sets default select() behavior for this path.
       * Set to true if this path should always be included in the results, false
       * if it should be excluded by default. This setting can be overridden at
       * the query level.
       */
      select?: boolean | any;

      /**
       * Setters allow you to transform the data before it gets to the raw mongodb
       * document and is set as a value on an actual key.
       */
      set?: (value: T, schematype?: this) => T | any;

      /** Declares a sparse index. */
      sparse?: boolean | any;

      /** Declares a full text index. */
      text?: boolean | any;

      /**
       * Adds validator(s) for this document path.
       * Validators always receive the value to validate as their first argument
       * and must return Boolean. Returning false means validation failed.
       */
      validate?: RegExp | [RegExp, string] |
      SchemaTypeOpts.ValidateFn<T> | [SchemaTypeOpts.ValidateFn<T>, string] |
      SchemaTypeOpts.ValidateOpts | SchemaTypeOpts.AsyncValidateOpts |
      SchemaTypeOpts.AsyncPromiseValidationFn<T> | SchemaTypeOpts.AsyncPromiseValidationOpts |
      (SchemaTypeOpts.ValidateOpts | SchemaTypeOpts.AsyncValidateOpts |
        SchemaTypeOpts.AsyncPromiseValidationFn<T> | SchemaTypeOpts.AsyncPromiseValidationOpts)[];

      /** Declares an unique index. */
      unique?: boolean | any;


      /* Options for specific schema types (String, Number, Date, etc.) */
      /** String only - Adds an enum validator */
      enum?: T[] | SchemaTypeOpts.EnumOpts<T> | any;
      /** String only - Adds a lowercase setter. */
      lowercase?: boolean | any;
      /** String only - Sets a regexp validator. */
      match?: RegExp | [RegExp, string] | any;
      /** String only - Sets a maximum length validator. */
      maxlength?: number | [number, string] | any;
      /** String only - Sets a minimum length validator. */
      minlength?: number | [number, string] | any;
      /** String only - Adds a trim setter. */
      trim?: boolean | any;
      /** String only - Adds an uppercase setter. */
      uppercase?: boolean | any;

      /**
       * Date, Number only - Sets a minimum number validator.
       * Sets a minimum date validator.
       */
      min?: number | [number, string] |
      Date | [Date, string] |
      any;

      /**
       * Date, Number only - Sets a maximum number validator.
       * Sets a maximum date validator.
       */
      max?: number | [number, string] |
      Date | [Date, string] |
      any;

      /**
       * Date only - Declares a TTL index (rounded to the nearest second)
       * for Date types only.
       */
      expires?: number | string | any;

      /** ObjectId only - Adds an auto-generated ObjectId default if turnOn is true. */
      auto?: boolean | any;

      /** Map only - Specifies the type of the map's attributes */
      of?: any;

      [other: string]: any;
    }

    // Interfaces specific to schema type options should be scoped in this namespace
    namespace SchemaTypeOpts {
      interface DefaultFn<T> {
        (...args: any[]): T;
      }

      interface RequiredFn<T> {
        (required: boolean, message?: string): T;
      }

      interface ValidateFn<T> {
        (value: T): boolean;
      }

      interface AsyncValidateFn<T> {
        (value: T, done: (result: boolean) => void): void;
      }

      interface ValidateOptsBase {
        msg?: string;
        type?: string;
      }

      interface ValidateOpts extends ValidateOptsBase {
        /** deprecated */
        isAsync?: false;
        validator?: RegExp | ValidateFn<any>;
      }

      interface AsyncValidateOpts extends ValidateOptsBase {
        /** deprecated */
        isAsync: true;
        validator: AsyncValidateFn<any>;
      }

      interface AsyncPromiseValidationFn<T> {
        (value: T): Promise<boolean>;
      }

      interface AsyncPromiseValidationOpts extends ValidateOptsBase {
        validator: AsyncPromiseValidationFn<any>;
      }

      interface EnumOpts<T> {
        values?: T[];
        message?: string;
      }

      interface IndexOpts {
        background?: boolean,
        expires?: number | string
        sparse?: boolean,
        type?: string,
        unique?: boolean,
      }
    }

    /*
     * section document.js
     * http://mongoosejs.com/docs/api.html#document-js
     */
    // interface MongooseDocument<T extends object = any> extends T { }
    interface BaseMongooseDocument<T extends object = any> {
      /** Checks if a path is set to its default. */
      $isDefault?(path?: string): boolean;

      /** Getter/setter around the session associated with this document. */
      $session?(session?: ClientSession): ClientSession;

      /**
       * Takes a populated field and returns it to its unpopulated state.
       * If the path was not populated, this is a no-op.
       */
      depopulate?(path?: string): this;

      /**
       * Returns true if the Document stores the same data as doc.
       * Documents are considered equal when they have matching _ids, unless neither document
       * has an _id, in which case this function falls back to usin deepEqual().
       * @param doc a document to compare
       */
      equals?(doc: BaseMongooseDocument): boolean;

      /**
       * Explicitly executes population and returns a promise.
       * Useful for ES2015 integration.
       * @returns promise that resolves to the document when population is done
       */
      execPopulate?(): Promise<this>;

      /** Checks if path was explicitly selected. If no projection, always returns true. */
      isDirectSelected?(path: string): boolean;

      /**
       * Returns the value of a path.
       * @param type optionally specify a type for on-the-fly attributes
       */
      get?<Key extends keyof T>(path: T, type?: any): T[Key];
      get?(path: string, type?: any): any;

      /**
       * Initializes the document without setters or marking anything modified.
       * Called internally after a document is returned from mongodb.
       * @param doc document returned by mongo
       * @param opts Options
       */
      init?<DocType extends BaseMongooseDocument>(doc: Partial<DocType>, opts?: any): this;

      /** Helper for console.log */
      inspect?(options?: any): any;

      /**
       * Marks a path as invalid, causing validation to fail.
       * The errorMsg argument will become the message of the ValidationError.
       * The value argument (if passed) will be available through the ValidationError.value property.
       * @param path the field to invalidate
       * @param errorMsg the error which states the reason path was invalid
       * @param value optional invalid value
       * @param kind optional kind property for the error
       * @returns the current ValidationError, with all currently invalidated paths
       */
      invalidate?(path: string, errorMsg: string | NativeError, value?: any, kind?: string): Error.ValidationError | boolean;

      /** Returns true if path was directly set and modified, else false. */
      isDirectModified?(path: string): boolean;

      /** Checks if path was initialized */
      isInit?(path: string): boolean;

      /**
       * Returns true if this document was modified, else false.
       * If path is given, checks if a path or any full path containing path as part of its path
       * chain has been modified.
       */
      isModified?(path?: string): boolean;

      /** Checks if path was selected in the source query which initialized this document. */
      isSelected?(path: string): boolean;

      /**
       * Marks the path as having pending changes to write to the db.
       * Very helpful when using Mixed types.
       * @param path the path to mark modified
       */
      markModified?(path: string): void;

      /** Returns the list of paths that have been modified. */
      modifiedPaths?(): string[];

      /**
       * Populates document references, executing the callback when complete.
       * If you want to use promises instead, use this function with
       * execPopulate()
       * Population does not occur unless a callback is passed or you explicitly
       * call execPopulate(). Passing the same path a second time will overwrite
       * the previous path options. See Model.populate() for explaination of options.
       * @param path The path to populate or an options object
       * @param names The properties to fetch from the populated document
       * @param callback When passed, population is invoked
       */
      populate?(callback: (err: any, res: this) => void): this;
      populate?(path: string, callback?: (err: any, res: this) => void): this;
      populate?(path: string, names: string, callback?: (err: any, res: this) => void): this;
      populate?(options: ModelPopulateOptions | ModelPopulateOptions[], callback?: (err: any, res: this) => void): this;

      /** Gets _id(s) used during population of the given path. If the path was not populated, undefined is returned. */
      populated?(path: string): any;

      /**
       * Sets the value of a path, or many paths.
       * @param path path or object of key/vals to set
       * @param val the value to set
       * @param type optionally specify a type for "on-the-fly" attributes
       * @param options optionally specify options that modify the behavior of the set
       */
      set?(path: string, val: any, options?: any): this;
      set?(path: string, val: any, type: any, options?: any): this;
      set?(value: any): this;

      /**
       * Overwrite all values, except for immutable properties.
       * @param obj the object to overwrite this document with
       */
      overwrite?(obj: any): this;

      /**
       * The return value of this method is used in calls to JSON.stringify(doc).
       * This method accepts the same options as Document#toObject. To apply the
       * options to every document of your schema by default, set your schemas
       * toJSON option to the same argument.
       */
      toJSON?(options?: DocumentToObjectOptions): LeanDocument<T>;

      /**
       * Converts this document into a plain javascript object, ready for storage in MongoDB.
       * Buffers are converted to instances of mongodb.Binary for proper storage.
       */
      toObject?(options?: DocumentToObjectOptions): LeanDocument<T>;

      /** Helper for console.log */
      toString(): string;

      /**
       * Clears the modified state on the specified path.
       * @param path the path to unmark modified
       */
      unmarkModified?(path: string): void;

      /** Sends an replaceOne command with this document _id as the query selector.  */
      replaceOne?(replacement: any, callback?: (err: any, raw: any) => void): Query<any>;

      /** Sends an update command with this document _id as the query selector.  */
      update?(doc: any, callback?: (err: any, raw: any) => void): Query<any>;
      update?(doc: any, options: ModelUpdateOptions,
        callback?: (err: any, raw: any) => void): Query<any>;

      /** Sends an updateOne command with this document _id as the query selector.  */
      updateOne?(doc: any, callback?: (err: any, raw: any) => void): Query<any>;
      updateOne?(doc: any, options: ModelUpdateOptions,
        callback?: (err: any, raw: any) => void): Query<any>;

      /**
       * Executes registered validation rules for this document.
       * @param optional options internal options
       * @param callback callback called after validation completes, passing an error if one occurred
       */
      validate?(callback?: (err: any) => void): Promise<void>;
      validate?(optional: any, callback?: (err: any) => void): Promise<void>;

      /**
       * Executes registered validation rules (skipping asynchronous validators) for this document.
       * This method is useful if you need synchronous validation.
       * @param pathsToValidate only validate the given paths
       * @returns ValidationError if there are errors during validation, or undefined if there is no error.
       */
      validateSync?(pathsToValidate?: string | string[]): Error.ValidationError;

      /** Hash containing current validation errors. */
      errors?: any;
      /** This documents _id. */
      _id: T extends {_id: infer IdType} ? IdType : any;
      /** Boolean flag specifying if the document is new. */
      isNew?: boolean;
      /** The documents schema. */
      schema?: Schema;
    }
    type MongooseDocument<T extends object = any> = T & BaseMongooseDocument<T>;

    interface DocumentToObjectOptions {
      /** apply all getters (path and virtual getters) */
      getters?: boolean;
      /** apply virtual getters (can override getters option) */
      virtuals?: boolean;
      /** remove empty objects (defaults to true) */
      minimize?: boolean;
      /**
       * A transform function to apply to the resulting document before returning
       * @param doc The mongoose document which is being converted
       * @param ret The plain object representation which has been converted
       * @param options The options in use (either schema options or the options passed inline)
       */
      transform?: (doc: any, ret: any, options: any) => any;
      /** depopulate any populated paths, replacing them with their original refs (defaults to false) */
      depopulate?: boolean;
      /** whether to include the version key (defaults to true) */
      versionKey?: boolean;
      /** whether to convert Maps to POJOs. (defaults to false) */
      flattenMaps?: boolean;
    }

    namespace Types {
      /*
        * section types/subdocument.js
        * http://mongoosejs.com/docs/api.html#types-subdocument-js
        */

      type Subdocument<T extends object = any> = Document<T> & {
        /** Returns the top level document of this sub-document. */
        ownerDocument?(): MongooseDocument<any>;

        /**
         * Null-out this subdoc
         * @param callback optional callback for compatibility with Document.prototype.remove
         */
        remove?(callback?: (err: any) => void): void;
        remove?(options: any, callback?: (err: any) => void): void;
      }
      interface SubdocumentConstructor<T extends object = any> {
          new(doc?: LooseType<T>): Subdocument<T>;
      }
      const Subdocument: SubdocumentConstructor;

      // In order to make types work correctly we can't define this one as a class; otherwise
      // The type inheritance doesn't work
      type OptionalSubdocument<T extends object> = Subdocument<T>;

      /*
       * section types/array.js
       * http://mongoosejs.com/docs/api.html#types-array-js
       */
      // interface Array<T> extends globalThis.Array<T> { }
      class Array<T> extends globalThis.Array<T> {
          [i: number]: T;
          /**
           * Atomically shifts the array at most one time per document save().
           * Calling this mulitple times on an array before saving sends the same command as
           * calling it once. This update is implemented using the MongoDB $pop method which
           * enforces this restriction.
           */
          $shift?(): T;

          /** Alias of pull */
          remove?(...args: LooseType<T>[]): this;

          /**
           * Pops the array atomically at most one time per document save().
           * Calling this mulitple times on an array before saving sends the same command as
           * calling it once. This update is implemented using the MongoDB $pop method which
           * enforces this restriction.
           */
          $pop?(): T;

          /**
           * Adds values to the array if not already present.
           * @returns the values that were added
           */
          addToSet?(...args: LooseType<T>[]): T[];

          /**
           * Return the index of obj or -1 if not found.
           * @param obj the item to look for
           */
          indexOf(obj: any): number;

          /** Helper for console.log */
          inspect?(): any;

          /**
           * Marks the entire array as modified, which if saved, will store it as a $set
           * operation, potentially overwritting any changes that happen between when you
           * retrieved the object and when you save it.
           * @returns new length of the array
           */
          nonAtomicPush?(...args: LooseType<T>[]): number;

          /**
           * Wraps Array#pop with proper change tracking.
           * marks the entire array as modified which will pass the entire thing to $set
           * potentially overwritting any changes that happen between when you retrieved
           * the object and when you save it.
           */
          pop(): T;

          /**
           * Pulls items from the array atomically. Equality is determined by casting
           * the provided value to an embedded document and comparing using
           * the Document.equals() function.
           */
          pull?(...args: LooseType<T>[]): this;

          /**
           * Wraps Array#push with proper change tracking.
           * @returns new length of the array
           */
          push(...args: (T|LooseType<T>)[]): number;

          /** Sets the casted val at index i and marks the array modified. */
          set?<I extends number>(i: I, val: LooseType<this[I]>): this;

          /**
           * Wraps Array#shift with proper change tracking.
           * Marks the entire array as modified, which if saved, will store it as a $set operation,
           * potentially overwritting any changes that happen between when you retrieved the object
           * and when you save it.
           */
          shift(): T;

          /**
           * Wraps Array#sort with proper change tracking.
           * Marks the entire array as modified, which if saved, will store it as a $set operation,
           * potentially overwritting any changes that happen between when you retrieved the object
           * and when you save it.
           */
          // some lib.d.ts have return type "this" and others have return type "T[]"
          // which causes errors. Let the inherited array provide the sort() method.
          //sort(compareFn?: (a: T, b: T) => number): T[];

          /**
           * Wraps Array#splice with proper change tracking and casting.
           * Marks the entire array as modified, which if saved, will store it as a $set operation,
           * potentially overwritting any changes that happen between when you retrieved the object
           * and when you save it.
           */
          splice(start: number, deleteCount?: number): T[];
          splice(start: number, deleteCount: number, ...items: LooseType<T>[]): T[];

          /** Returns a native js Array. */
          toObject?(options?: any): _TypeHelpers.LeanType<T>[];

          /**
           * Wraps Array#unshift with proper change tracking.
           * Marks the entire array as modified, which if saved, will store it as a $set operation,
           * potentially overwritting any changes that happen between when you retrieved the object
           * and when you save it.
           */
          unshift(...args: (T|LooseType<T>)[]): number;
      }

      type OptionalArray<T> = Array<T>;

      /*
       * section types/documentarray.js
       * http://mongoosejs.com/docs/api.html#types-documentarray-js
       */
      interface DocumentArray<T> extends Array<T> {
          /**
           * Creates a subdocument casted to this schema.
           * This is the same subdocument constructor used for casting.
           * @param obj the value to cast to this arrays SubDocument schema
           */
          create?(obj?: any): T;

          /**
           * Searches array items for the first document with a matching _id.
           * @returns the subdocument or null if not found.
           */
          id?(id: ObjectId | string | number | NativeBuffer): T;

          /** Helper for console.log */
          inspect?(): T[];

          /**
           * Returns a native js Array of plain js objects
           * @param options optional options to pass to each documents toObject
           *   method call during conversion
           */
          toObject?(options?: any): _TypeHelpers.LeanType<T>[];
        }

      type OptionalDocumentArray<T extends MongooseDocument> = DocumentArray<T>;

      /*
       * section types/buffer.js
       * http://mongoosejs.com/docs/api.html#types-buffer-js
       */
      class Buffer extends global.Buffer {
        /**
         * Copies the buffer.
         * Buffer#copy does not mark target as modified so you must copy
         * from a MongooseBuffer for it to work as expected. This is a
         * work around since copy modifies the target, not this.
         */
        copy(target: NativeBuffer, ...nodeBufferArgs: any[]): number;

        /** Determines if this buffer is equals to other buffer */
        equals(other: NativeBuffer): boolean;

        /** Sets the subtype option and marks the buffer modified. */
        subtype(subtype: number): void;

        /** Converts this buffer to its Binary type representation. */
        toObject(subtype?: number): mongodb.Binary;

        /** Writes the buffer. */
        write(string: string, ...nodeBufferArgs: any[]): number;
      }

      /*
        * section types/objectid.js
        * http://mongoosejs.com/docs/api.html#types-objectid-js
        */
      var ObjectId: ObjectIdConstructor;

      // mongodb.ObjectID does not allow mongoose.Types.ObjectId(id). This is
      //   commonly used in mongoose and is found in an example in the docs:
      //   http://mongoosejs.com/docs/api.html#aggregate_Aggregate
      // constructor exposes static methods of mongodb.ObjectID and ObjectId(id)
      type ObjectIdConstructor = typeof mongodb.ObjectId & {
        (s?: string | number): mongodb.ObjectId;
      };

      // var objectId: mongoose.Types.ObjectId should reference mongodb.ObjectID not
      //   the ObjectIdConstructor, so we add the interface below
      interface ObjectId extends mongodb.ObjectId { }

      class Decimal128 extends mongodb.Decimal128 { }

      /*
        * section types/embedded.js
        * http://mongoosejs.com/docs/api.html#types-embedded-js
        */
      interface EmbeddedInterface {
        /** Helper for console.log */
        inspect(): any;

        /**
         * Marks a path as invalid, causing validation to fail.
         * @param path the field to invalidate
         * @param err error which states the reason path was invalid
         */
        invalidate(path: string, err: string | NativeError): boolean;

        /** Returns the top level document of this sub-document. */
        ownerDocument(): MongooseDocument;
        /** Returns this sub-documents parent document. */
        parent(): MongooseDocument;
        /** Returns this sub-documents parent array. */
        parentArray(): DocumentArray<MongooseDocument>;

        /** Removes the subdocument from its parent array. */
        remove(options?: {
          noop?: boolean;
        }, fn?: (err: any) => void): this;

        /**
         * Marks the embedded doc modified.
         * @param path the path which changed
         */
        markModified(path: string): void;
      }
      type Embedded<T extends object> = MongooseDocument<T> & EmbeddedInterface;

      /**
       * section types/map.js
       * https://mongoosejs.com/docs/schematypes.html#maps
       */
      class Map<V> extends global.Map<string, V> {
        /** Returns this Map object as a POJO. */
        toObject(options: { flattenMaps: true } & object): Record<string, V>;
        /** Returns a native js Map. */
        toObject(options?: any): GlobalMap<string, V>;
      }
    }

    // Because the mongoose Map type shares a name with the default global interface,
    // this type alias has to exist outside of the namespace
    interface GlobalMap<K, V> extends Map<K, V> {}

    // NotArrayOf<string[]> == string, NotArrayOf<string> == string
    //    - This does have one weakness -- if you have NotArrayOf<string[][]> it will be string[],
    //      which can then be stripped to string[], but I think in 99% of practical cases this
    //      won't matter, so I'm going with convenience.
    type DocNotArrayOf<T> = T extends unknown[] ? DocumentOf<T[number]> : DocumentOf<T>;

    type DocumentOf<T> = T extends Document ? T : never;

    // This one is a little tricksy; when you call lean() it returns a query which will return
    // your base object, but without everything added by Document; it might be an array or a single
    // object, so this will figure out what that type is. Assuming that type T (in T or T[]) is
    // a mongoose.Document<U> it will return U or U[]
    type LeanDocumentOrArray<T> =
      T extends _TypeHelpers.SuperUnlikelyType ? T :
      T extends unknown[] ? LeanDocument<T[number]>[] :
      LeanDocument<T>;

    /**
     * Given a mongoose Document<Foo> returns type Foo stripped (recursively) of
     * all functions and with any mongoose arrays converted to regular arrays
     * -- basically exactly the same as you would get if you called .toObject, et al
     */
    type LeanDocument<T> =
      [T] extends [_TypeHelpers.SuperUnlikelyType] ? T :
      T extends null ? T :
      [T] extends [Document<infer U>] ? _TypeHelpers.LeanObject<_TypeHelpers.ExcludeFunctions<U>> :
      // [T] extends [Types.Subdocument<infer U>] ? _TypeHelpers.LeanObject<_TypeHelpers.ExcludeFunctions<U>> :
      // [T] extends [MongooseDocument<infer U>] ? _TypeHelpers.LeanObject<_TypeHelpers.ExcludeFunctions<U>> :
      _TypeHelpers.LeanObject<_TypeHelpers.ExcludeFunctions<T>>;

    type LooseElementType<T> =
      [T] extends [_TypeHelpers.actualPrimitives] ? T :
      [T] extends [Types.ObjectId] ? {toHexString(): string} | {_id: Types.ObjectId | string} | string :
      [T] extends [Date] ? Date | number :
      T
    ;
    type LooseObjectType<T extends object> = {
      [Key in _TypeHelpers.KeysWithoutType<T, Function>]?: LooseType<T[Key]>
    };

    type LooseType<T> =
      [T] extends [_TypeHelpers.NotObject<T>] ? T | LooseElementType<T> :
      [T] extends [unknown[]] ? LooseType<T[number]>[] :
      [T] extends [Document<infer U>] ? LooseObjectType<U> :
      // [T] extends [Types.Subdocument<infer U>] ? 'LooseObjectType<U>2' :
      // [T] extends [MongooseDocument<infer U>] ? 'LooseObjectType<U>' :
      T extends object ? LooseObjectType<T> : T;

    namespace _TypeHelpers {

      type actualPrimitives = string | boolean | number | bigint | symbol | null | undefined;
      type TreatAsPrimitives = actualPrimitives |
          Date | RegExp | Symbol | Error | BigInt | Types.ObjectId;
      type NotObject<T> = T extends TreatAsPrimitives ? T : T extends object ? never : T;

      type GenericConstructable = {new(...args: any[]): any};
      type Unconstructable<T extends object> = T extends GenericConstructable ? Pick<T, keyof T> : T;

      type LeanType<T> =
          T extends SuperUnlikelyType | TreatAsPrimitives ? T : // Handle "any" and all primitives
          [T] extends [Document<infer U>] ? LeanDocument<U> :
          [T] extends [MongooseDocument<infer U>] ? LeanDocument<U> :
          // [T] extends [Types.Subdocument<infer U>] ? LeanDocument<U> :
          T;
      type PickU<T, K extends keyof T> = T extends any ? {[P in K]: T[P]} : never;


      type LeanObject<T extends object|null> = T extends null ? T : {
          [Key in keyof T]:
              [T[Key]] extends [SuperUnlikelyType | TreatAsPrimitives] ? T[Key] : // (matches any)
              [T[Key]] extends [unknown[]] ? LeanType<T[Key][number]>[] :
              [T[Key]] extends [MongooseDocument<any>] ? LeanDocument<T[Key]> :
              T[Key];
      }

      /**
       * What this does is selects all members of Base which extend the given Type but *do not*
       * extend the given NotType -- this is needed because, e.g. any extends Function evaluates
       * to true, so an "any" will be selected as well
       */
      type SuperUnlikelyType = AUT.SuperUnlikelyType;
      type FlagType<Base, Type> = {
          [Key in keyof Base]: Base[Key] extends Type ? Key : never
      };
      type DisallowedNames<Base, Type> =
          FlagType<Base, Type>[keyof Base];
      type KeysForType<Base, Type, NotType = SuperUnlikelyType> =
          Exclude< DisallowedNames<Base, Type>, DisallowedNames<Base, NotType> >;
      type KeysWithoutType<Base, Type, NotType = SuperUnlikelyType> =
          Exclude<keyof Base, KeysForType<Base, Type, NotType>>;
      type OmitType<Base, Type, NotType = SuperUnlikelyType> = Omit<Base,
          KeysForType<Base, Type, NotType>
          >;
      type ExcludeFunctions<T> = OmitType<T, Function>;
    }

    /*
     * section query.js
     * http://mongoosejs.com/docs/api.html#query-js
     *
     * Query<T> is for backwards compatibility. Example: Query<T>.find() returns Query<T[]>.
     * If later in the query chain a method returns Query<T>, we will need to know type T.
     * So we save this type as the second type parameter in DocumentQuery. Since people have
     * been using Query<T>, we set it as an alias of DocumentQuery.
     *
     * Furthermore, Query<T> is used for function that has an option { rawResult: true }.
     * for instance findOneAndUpdate.
     */
    class Query<T> extends DocumentQuery<T, any> { }
    class DocumentQuery<T = any, QueryHelpers = {}> extends mquery {
      /**
       * Specifies a javascript function or expression to pass to MongoDBs query system.
       * Only use $where when you have a condition that cannot be met using other MongoDB
       * operators like $lt. Be sure to read about all of its caveats before using.
       * @param js javascript string or function
       */
      $where(js: string | Function): this;

      /**
       * Specifies an $all query condition.
       * When called with one argument, the most recent path passed to where() is used.
       */
      all(val: number): this;
      all(path: string, val: number): this;

      /**
       * Specifies arguments for a $and condition.
       * @param array array of conditions
       */
      and(array: any[]): this;

      /** Specifies the batchSize option. Cannot be used with distinct() */
      batchSize(val: number): this;

      /** Get the current error flag value */
      error(): Error | null;
      /** Unset the error flag set on this query */
      error(unset: null): this;
      /**
       * Set the error flag on this query
       * @param err The error flag
       */
      error(err: Error): this;

      /**
       * Specifies a $box condition
       * @param Upper Right Coords
       */
      box(val: any): this;
      box(lower: number[], upper: number[]): this;

      /** Casts this query to the schema of model, If obj is present, it is cast instead of this query.*/
      cast(model: any, obj?: any): any;

      /**
       * Executes the query returning a Promise which will be
       * resolved with either the doc(s) or rejected with the error.
       * Like .then(), but only takes a rejection handler.
       */
      catch<TRes>(reject?: (err: any) => void | TRes | PromiseLike<TRes>): Promise<TRes>;

      /**
       * DEPRECATED Alias for circle
       * Specifies a $center or $centerSphere condition.
       * @deprecated Use circle instead.
       */
      center(area: any): this;
      center(path: string, area: any): this;
      /**
       * DEPRECATED Specifies a $centerSphere condition
       * @deprecated Use circle instead.
       */
      centerSphere(path: string, val: any): this;
      centerSphere(val: any): this;

      /** Specifies a $center or $centerSphere condition. */
      circle(area: any): this;
      circle(path: string, area: any): this;

      /** Adds a collation to this op (MongoDB 3.4 and up) */
      collation(value: CollationOptions): this;

      /** Specifies the comment option. Cannot be used with distinct() */
      comment(val: string): this;

      /**
       * Specifying this query as a count query. Passing a callback executes the query.
       * @param criteria mongodb selector
       */
      count(callback?: (err: any, count: number) => void): Query<number> & QueryHelpers;
      count(criteria: any, callback?: (err: any, count: number) => void): Query<number> & QueryHelpers;

      /**
       * Specifies this query as a `countDocuments()` query. Behaves like `count()`,
       * except it always does a full collection scan when passed an empty filter `{}`.
       *
       * There are also minor differences in how `countDocuments()` handles
       * [`$where` and a couple geospatial operators](http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#countDocuments).
       * versus `count()`.
       *
       * Passing a `callback` executes the query.
       *
       * This function triggers the following middleware.
       *
       * - `countDocuments()`
       *
       *
       * @param {Object} [criteria] mongodb selector
       * @param {Function} [callback] optional params are (error, count)
       * @return {Query} this
      */
      countDocuments(callback?: (err: any, count: number) => void): Query<number> & QueryHelpers;
      countDocuments(criteria: any, callback?: (err: any, count: number) => void): Query<number> & QueryHelpers;

      /**
       * Estimates the number of documents in the MongoDB collection. Faster than
       * using `countDocuments()` for large collections because
       * `estimatedDocumentCount()` uses collection metadata rather than scanning
       * the entire collection.
       *
       * @param {Object} [options] passed transparently to the [MongoDB driver](http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#estimatedDocumentCount)
       * @param {Function} [callback] optional params are (error, count)
       * @return {Query} this
       */
      estimatedDocumentCount(callback?: (err: any, count: number) => void): Query<number> & QueryHelpers;
      estimatedDocumentCount(options: any, callback?: (err: any, count: number) => void): Query<number> & QueryHelpers;

      /**
       * Returns a wrapper around a mongodb driver cursor. A Query<T>Cursor exposes a
       * Streams3-compatible interface, as well as a .next() function.
       */
      cursor(options?: any): QueryCursor<DocNotArrayOf<T>>;

      /** Declares or executes a distict() operation. Passing a callback executes the query. */
      distinct(callback?: (err: any, res: any[]) => void): Query<any[]> & QueryHelpers;
      distinct(field: string, callback?: (err: any, res: any[]) => void): Query<any[]> & QueryHelpers;
      distinct(field: string, criteria: any | Query<any>,
        callback?: (err: any, res: any[]) => void): Query<any[]> & QueryHelpers;

      /** Specifies an $elemMatch condition */
      elemMatch(criteria: (elem: Query<any>) => void): this;
      elemMatch(criteria: any): this;
      elemMatch(path: string | any | Function, criteria: (elem: Query<any>) => void): this;
      elemMatch(path: string | any | Function, criteria: any): this;

      /** Specifies the complementary comparison value for paths specified with where() */
      equals<T>(val: T): this;

      /** Executes the query */
      exec(callback?: (err: NativeError, res: T) => void): Promise<T>;
      exec(operation: string | Function, callback?: (err: any, res: T) => void): Promise<T>;

      /** Specifies an $exists condition */
      exists(val?: boolean): this;
      exists(path: string, val?: boolean): this;

      /**
       * Finds documents. When no callback is passed, the query is not executed. When the
       * query is executed, the result will be an array of documents.
       * @param criteria mongodb selector
       */
      find(callback?: (err: any, res: T) => void): DocumentQuery<T> & QueryHelpers;
      find(criteria: any,
        callback?: (err: any, res: T) => void): DocumentQuery<T> & QueryHelpers;

      /**
       * Declares the query a findOne operation. When executed, the first found document is
       * passed to the callback. Passing a callback executes the query. The result of the query
       * is a single document.
       * @param criteria mongodb selector
       * @param projection optional fields to return
       */
      findOne(callback?: (err: any, res: DocNotArrayOf<T> | null) => void): DocumentQuery<DocNotArrayOf<T> | null> & QueryHelpers;
      findOne(criteria: any,
        callback?: (err: any, res: DocNotArrayOf<T> | null) => void): DocumentQuery<DocNotArrayOf<T> | null> & QueryHelpers;

      /**
       * Issues a mongodb findAndModify remove command.
       * Finds a matching document, removes it, passing the found document (if any) to the
       * callback. Executes immediately if callback is passed.
       *
       * If mongoose option 'useFindAndModify': set to false it uses native findOneAndUpdate() rather than deprecated findAndModify().
       * https://mongoosejs.com/docs/api.html#mongoose_Mongoose-set
       */
      findOneAndRemove(callback?: (error: any, doc: DocNotArrayOf<T> | null, result: any) => void): DocumentQuery<DocNotArrayOf<T> | null> & QueryHelpers;
      findOneAndRemove(conditions: any,
        callback?: (error: any, doc: DocNotArrayOf<T> | null, result: any) => void): DocumentQuery<DocNotArrayOf<T> | null> & QueryHelpers;
      findOneAndRemove(conditions: any, options: { rawResult: true } & QueryFindOneAndRemoveOptions,
        callback?: (error: any, doc: mongodb.ModifyResult<DocNotArrayOf<T> | null>, result: any) => void)
          : Query<mongodb.ModifyResult<DocNotArrayOf<T> | null>> & QueryHelpers;
      findOneAndRemove(conditions: any, options: QueryFindOneAndRemoveOptions,
        callback?: (error: any, doc: DocNotArrayOf<T> | null, result: any) => void): DocumentQuery<DocNotArrayOf<T> | null> & QueryHelpers;

      /**
       * Issues a mongodb findAndModify update command.
       * Finds a matching document, updates it according to the update arg, passing any options, and returns
       * the found document (if any) to the callback. The query executes immediately if callback is passed.
       *
       * If mongoose option 'useFindAndModify': set to false it uses native findOneAndUpdate() rather than deprecated findAndModify().
       * https://mongoosejs.com/docs/api.html#mongoose_Mongoose-set
       */
      findOneAndUpdate(callback?: (err: any, doc: DocNotArrayOf<T> | null) => void): DocumentQuery<DocNotArrayOf<T> | null> & QueryHelpers;
      findOneAndUpdate(update: any,
        callback?: (err: any, doc: DocNotArrayOf<T> | null, res: any) => void): DocumentQuery<DocNotArrayOf<T> | null> & QueryHelpers;
      findOneAndUpdate(query: any, update: any,
        callback?: (err: any, doc: DocNotArrayOf<T> | null, res: any) => void): DocumentQuery<DocNotArrayOf<T> | null> & QueryHelpers;
      findOneAndUpdate(query: any, update: any,
        options: { rawResult: true } & { upsert: true } & { new: true } & QueryFindOneAndUpdateOptions,
        callback?: (err: any, doc: mongodb.ModifyResult<DocNotArrayOf<T>>, res: any) => void)
          : Query<mongodb.ModifyResult<DocNotArrayOf<T>>> & QueryHelpers;
      findOneAndUpdate(query: any, update: any,
        options: { upsert: true } & { new: true } & QueryFindOneAndUpdateOptions,
        callback?: (err: any, doc: DocNotArrayOf<T>, res: any) => void): DocumentQuery<DocNotArrayOf<T>> & QueryHelpers;
      findOneAndUpdate(query: any, update: any, options: { rawResult: true } & QueryFindOneAndUpdateOptions,
        callback?: (err: any, doc: mongodb.ModifyResult<DocNotArrayOf<T> | null>, res: any) => void)
          : Query<mongodb.ModifyResult<DocNotArrayOf<T> | null>> & QueryHelpers;
      findOneAndUpdate(query: any, update: any, options: QueryFindOneAndUpdateOptions,
        callback?: (err: any, doc: DocNotArrayOf<T> | null, res: any) => void): DocumentQuery<DocNotArrayOf<T> | null> & QueryHelpers;

      /**
       * Specifies a $geometry condition. geometry() must come after either intersects() or within().
       * @param object Must contain a type property which is a String and a coordinates property which
       *   is an Array. See the examples.
       */
      geometry(object: { type: string, coordinates: any[] }): this;

      /**
       * Returns the current query options as a JSON object.
       * @returns current query options
       */
      getOptions(): any;

      /**
       * Returns the current query conditions as a JSON object.
       * @returns current query conditions
       */
      getQuery(): any;

      /**
       * Returns the current update operations as a JSON object.
       * @returns current update operations
       */
      getUpdate(): any;

      /**
       * Specifies a $gt query condition.
       * When called with one argument, the most recent path passed to where() is used.
       */
      gt<T>(val: T): this;
      gt<T>(path: string, val: T): this;

      /**
       * Specifies a $gte query condition.
       * When called with one argument, the most recent path passed to where() is used.
       */
      gte<T>(val: T): this;
      gte<T>(path: string, val: T): this;

      /**
       * Sets query hints.
       * @param val a hint object
       */
      hint(val: any): this;

      /**
       * Specifies an $in query condition.
       * When called with one argument, the most recent path passed to where() is used.
       */
      in(val: any[]): this;
      in(path: string, val: any[]): this;

      /** Declares an intersects query for geometry(). MUST be used after where(). */
      intersects(arg?: any): this;

      /**
       * Sets the lean option.
       * Documents returned from queries with the lean option enabled are plain
       * javascript objects, not MongooseDocuments. They have no save method,
       * getters/setters or other Mongoose magic applied.
       * @param {Boolean|Object} bool defaults to true
       */
      lean<DT extends DocumentQuery>(this: DT, bool?: boolean | object): DocumentQuery<LeanDocumentOrArray<T>, QueryHelpers>;

      /** Specifies the maximum number of documents the query will return. Cannot be used with distinct() */
      limit(val: number): this;

      /**
       * Specifies a $lt query condition.
       * When called with one argument, the most recent path passed to where() is used.
       */
      lt<T>(val: T): this;
      lt<T>(path: string, val: T): this;

      /**
       * Specifies a $lte query condition.
       * When called with one argument, the most recent path passed to where() is used.
       */
      lte<T>(val: T): this;
      lte<T>(path: string, val: T): this;

      /**
       * Specifies a $maxDistance query condition.
       * When called with one argument, the most recent path passed to where() is used.
       */
      maxDistance(val: number): this;
      maxDistance(path: string, val: number): this;

      /** @deprecated Alias of maxScan */
      maxscan(val: number): this;
      /** Specifies the maxScan option. Cannot be used with distinct() */
      maxScan(val: number): this;

      /** Specifies the maxTimeMS options. */
      maxTimeMS(val: number): this;

      /**
       * Merges another Query or conditions object into this one.
       * When a Query is passed, conditions, field selection and options are merged.
       */
      merge(source: any | Query<any>): this;

      /** Specifies a $mod condition */
      mod(val: number[]): this;
      mod(path: string, val: number[]): this;

      /**
       * Specifies a $ne query condition.
       * When called with one argument, the most recent path passed to where() is used.
       */
      ne(val: any): this;
      ne(path: string, val: any): this;

      /** Specifies a $near or $nearSphere condition. */
      near(val: any): this;
      near(path: string, val: any): this;

      /**
       * DEPRECATED Specifies a $nearSphere condition
       * @deprecated Use query.near() instead with the spherical option set to true.
       */
      nearSphere(val: any): this;
      nearSphere(path: string, val: any): this;

      /**
       * Specifies a $nin query condition.
       * When called with one argument, the most recent path passed to where() is used.
       */
      nin(val: any[]): this;
      nin(path: string, val: any[]): this;

      /**
       * Specifies arguments for a $nor condition.
       * @param array array of conditions
       */
      nor(array: any[]): this;

      /**
       * Specifies arguments for an $or condition.
       * @param array array of conditions
       */
      or(array: any[]): this;

      /**
       * Make this query throw an error if no documents match the given `filter`.
       * This is handy for integrating with async/await, because `orFail()` saves you
       * an extra `if` statement to check if no document was found.
       *
       * Example:
       *
       *     // Throws if no doc returned
       *     await Model.findOne({ foo: 'bar' }).orFail();
       *
       *     // Throws if no document was updated
       *     await Model.updateOne({ foo: 'bar' }, { name: 'test' }).orFail();
       *
       *     // Throws "No docs found!" error if no docs match `{ foo: 'bar' }`
       *     await Model.find({ foo: 'bar' }).orFail(new Error('No docs found!'));
       *
       *     // Throws "Not found" error if no document was found
       *     await Model.findOneAndUpdate({ foo: 'bar' }, { name: 'test' }).
       *       orFail(() => Error('Not found'));
       *
       * @param err optional error to throw if no docs match `filter`
       */
      orFail(err?: Error | (() => Error)): this;

      /** Specifies a $polygon condition */
      polygon(...coordinatePairs: number[][]): this;
      polygon(path: string, ...coordinatePairs: number[][]): this;

      /**
       * Specifies paths which should be populated with other documents.
       * Paths are populated after the query executes and a response is received. A separate
       * query is then executed for each path specified for population. After a response for
       * each query has also been returned, the results are passed to the callback.
       * @param path either the path to populate or an object specifying all parameters
       * @param select Field selection for the population query
       * @param model The model you wish to use for population. If not specified, populate
       *   will look up the model by the name in the Schema's ref field.
       * @param match Conditions for the population query
       * @param options Options for the population query (sort, etc)
       */
      populate(path: string | any, select?: string | any, model?: any,
        match?: any, options?: any): this;
      populate(options: QueryPopulateOptions | QueryPopulateOptions[]): this;

      /**
       * Determines the MongoDB nodes from which to read.
       * @param pref one of the listed preference options or aliases
       * @tags optional tags for this query
       */
      read(pref: string, tags?: any[]): this;

      /**
       * Sets the readConcern option for the query.
       * @param level one of the listed read concern level or their aliases
       */
      readConcern(level: string): this;

      /**
       * Specifies a $regex query condition.
       * When called with one argument, the most recent path passed to where() is used.
       */
      regex(val: RegExp): this;
      regex(path: string, val: RegExp): this;

      /**
       * Declare and/or execute this query as a remove() operation.
       * The operation is only executed when a callback is passed. To force execution without a callback,
       * you must first call remove() and then execute it by using the exec() method.
       * @param criteria mongodb selector
       */
      remove(callback?: (err: any) => void): Query<mongodb.DeleteResult> & QueryHelpers;
      remove(criteria: any | Query<any>, callback?: (err: any) => void): Query<mongodb.DeleteResult> & QueryHelpers;

      /** Specifies which document fields to include or exclude (also known as the query "projection") */
      select(arg: string | any): this;
      /** Determines if field selection has been made. */
      selected(): boolean;
      /** Determines if exclusive field selection has been made.*/
      selectedExclusively(): boolean;
      /** Determines if inclusive field selection has been made. */
      selectedInclusively(): boolean;
      /** Sets query options. */
      setOptions(options: any): this;
      /** Sets query conditions to the provided JSON object. */
      setQuery(conditions: any): this;

      /**
       * Sets the [MongoDB session](https://docs.mongodb.com/manual/reference/server-sessions/)
       * associated with this query. Sessions are how you mark a query as part of a
       * [transaction](/docs/transactions.html).
       */
      session(session: mongodb.ClientSession | null): this;

      /**
       * Specifies a $size query condition.
       * When called with one argument, the most recent path passed to where() is used.
       */
      size(val: number): this;
      size(path: string, val: number): this;

      /** Specifies the number of documents to skip. Cannot be used with distinct() */
      skip(val: number): this;

      /**
       * DEPRECATED Sets the slaveOk option.
       * @param v defaults to true
       * @deprecated in MongoDB 2.2 in favor of read preferences.
       */
      slaveOk(v?: boolean): this;

      /**
       * Specifies a $slice projection for an array.
       * @param val number/range of elements to slice
       */
      slice(val: number | number[]): this;
      slice(path: string, val: number | number[]): this;

      /** Specifies this query as a snapshot query. Cannot be used with distinct() */
      snapshot(v?: boolean): this;

      /**
       * Sets the sort order
       * If an object is passed, values allowed are asc, desc, ascending, descending, 1, and -1.
       * If a string is passed, it must be a space delimited list of path names. The
       * sort order of each path is ascending unless the path name is prefixed with -
       * which will be treated as descending.
       */
      sort(arg: string | any): this;

      /**
       * Sets the tailable option (for use with capped collections). Cannot be used with distinct()
       * @param bool defaults to true
       * @param opts options to set
       * @param opts.numberOfRetries if cursor is exhausted, retry this many times before giving up
       * @param opts.tailableRetryInterval if cursor is exhausted, wait this many milliseconds before retrying
       */
      tailable(bool?: boolean, opts?: {
        numberOfRetries?: number;
        tailableRetryInterval?: number;
      }): this;

      /** Executes this query and returns a promise */
      then: Promise<T>["then"];

      /**
       * Converts this query to a customized, reusable query
       * constructor with all arguments and options retained.
       */
      toConstructor<T>(): new (...args: any[]) => Query<T> & QueryHelpers;
      toConstructor<T>(): new (...args: any[]) => DocumentQuery<T> & QueryHelpers;

      /**
       * Declare and/or execute this query as an update() operation.
       * All paths passed that are not $atomic operations will become $set ops.
       * @param doc the update command
       */
      update(callback?: (err: any, affectedRows: number) => void): Query<number> & QueryHelpers;
      update(doc: any, callback?: (err: any, affectedRows: number) => void): Query<number> & QueryHelpers;
      update(criteria: any, doc: any,
        callback?: (err: any, affectedRows: number) => void): Query<number> & QueryHelpers;
      update(criteria: any, doc: any, options: QueryUpdateOptions,
        callback?: (err: any, affectedRows: number) => void): Query<number> & QueryHelpers;

      /** Specifies a path for use with chaining. */
      where(path?: string | any, val?: any): this;

      /** Defines a $within or $geoWithin argument for geo-spatial queries. */
      within(val?: any): this;
      within(coordinate: number[], ...coordinatePairs: number[][]): this;

      /** Flag to opt out of using $geoWithin. */
      static use$geoWithin: boolean;
    }

    // https://github.com/aheckmann/mquery
    // mquery currently does not have a type definition please
    //   replace it if one is ever created
    class mquery { }

    interface QueryFindOneAndRemoveOptions {
      /**
        * if multiple docs are found by the conditions, sets the sort order to choose
        * which doc to update
        */
      sort?: any;
      /** puts a time limit on the query - requires mongodb >= 2.6.0 */
      maxTimeMS?: number;
      /** sets the document fields to return */
      select?: any;
      /** like select, it determines which fields to return */
      projection?: any;
      /** if true, returns the raw result from the MongoDB driver */
      rawResult?: boolean;
      /** overwrites the schema's strict mode option for this update */
      strict?: boolean|string;
    }

    interface QueryFindOneAndUpdateOptions extends QueryFindOneAndRemoveOptions {
      /** if true, return the modified document rather than the original. defaults to false (changed in 4.0) */
      new?: boolean;
      /** creates the object if it doesn't exist. defaults to false. */
      upsert?: boolean;
      /** if true, runs update validators on this command. Update validators validate the update operation against the model's schema. */
      runValidators?: boolean;
      /**
       * if this and upsert are true, mongoose will apply the defaults specified in the model's schema if a new document
       * is created. This option only works on MongoDB >= 2.4 because it relies on MongoDB's $setOnInsert operator.
       */
      setDefaultsOnInsert?: boolean;
      /**
       * if set to 'query' and runValidators is on, this will refer to the query in custom validator
       * functions that update validation runs. Does nothing if runValidators is false.
       */
      context?: string;
      /**
       *  by default, mongoose only returns the first error that occurred in casting the query.
       *  Turn on this option to aggregate all the cast errors.
       */
        multipleCastError?: boolean;
      /** Field selection. Equivalent to .select(fields).findOneAndUpdate() */
      fields?: any | string;
    }

    interface QueryUpdateOptions extends ModelUpdateOptions {
      /**
       * if set to 'query' and runValidators is on, this will refer to the query
       * in customvalidator functions that update validation runs. Does nothing
       * if runValidators is false.
       */
      context?: string;
    }

    interface CollationOptions {
      locale?: string;
      caseLevel?: boolean;
      caseFirst?: string;
      strength?: number;
      numericOrdering?: boolean;
      alternate?: string;
      maxVariable?: string;
      backwards?: boolean;
    }

    namespace Schema {
      namespace Types {
        /*
          * section schema/array.js
          * http://mongoosejs.com/docs/api.html#schema-array-js
          */
        class Array extends SchemaType {
          /** Array SchemaType constructor */
          constructor(key: string, cast?: SchemaType, options?: any);

          /**
           * Check if the given value satisfies a required validator. The given value
           * must be not null nor undefined, and have a non-zero length.
           */
          checkRequired<T extends { length: number }>(value: T): boolean;

          /** This schema type's name, to defend against minifiers that mangle function names. */
          static schemaName: string;
        }

        /*
          * section schema/string.js
          * http://mongoosejs.com/docs/api.html#schema-string-js
          */
        class String extends SchemaType {
          /** String SchemaType constructor. */
          constructor(key: string, options?: any);

          /** Check if the given value satisfies a required validator. */
          checkRequired(value: any, doc: MongooseDocument): boolean;

          /**
           * Adds an enum validator
           * @param args enumeration values
           */
          enum(args: string | string[] | any): this;

          /** Adds a lowercase setter. */
          lowercase(): this;

          /**
           * Sets a regexp validator. Any value that does not pass regExp.test(val) will fail validation.
           * @param regExp regular expression to test against
           * @param message optional custom error message
           */
          match(regExp: RegExp, message?: string): this;

          /**
           * Sets a maximum length validator.
           * @param value maximum string length
           * @param message optional custom error message
           */
          maxlength(value: number, message?: string): this;

          /**
           * Sets a minimum length validator.
           * @param value minimum string length
           * @param message optional custom error message
           */
          minlength(value: number, message?: string): this;

          /** Adds a trim setter. The string value will be trimmed when set. */
          trim(): this;
          /** Adds an uppercase setter. */
          uppercase(): this;

          /** This schema type's name, to defend against minifiers that mangle function names. */
          static schemaName: string;

        }

        /*
          * section schema/documentarray.js
          * http://mongoosejs.com/docs/api.html#schema-documentarray-js
          */
        class DocumentArray extends Array {
          /** SubdocsArray SchemaType constructor */
          constructor(key: string, schema: Schema, options?: any);

          /** This schema type's name, to defend against minifiers that mangle function names. */
          static schemaName: string;

          /**
           * Adds a discriminator type.
           * @param name discriminator model name
           * @param schema discriminator model schema
           */
          discriminator<U extends Document>(name: string, schema: Schema): Model<U>;

          /**
           * Adds a discriminator type.
           * @param name discriminator model name
           * @param schema discriminator model schema
           */
          discriminator<U extends Document, M extends Model<U>>(name: string, schema: Schema): M;

        }

        /*
          * section schema/number.js
          * http://mongoosejs.com/docs/api.html#schema-number-js
          */
        class Number extends SchemaType {
          /** Number SchemaType constructor. */
          constructor(key: string, options?: any);

          /** Check if the given value satisfies a required validator. */
          checkRequired(value: any, doc: MongooseDocument): boolean;

          /**
           * Sets a maximum number validator.
           * @param maximum number
           * @param message optional custom error message
           */
          max(maximum: number, message?: string): this;

          /**
           * Sets a minimum number validator.
           * @param value minimum number
           * @param message optional custom error message
           */
          min(value: number, message?: string): this;

          /** This schema type's name, to defend against minifiers that mangle function names. */
          static schemaName: string;
        }

        /*
          * section schema/date.js
          * http://mongoosejs.com/docs/api.html#schema-date-js
          */
        class Date extends SchemaType {
          /** Date SchemaType constructor. */
          constructor(key: string, options?: any);

          /**
           * Check if the given value satisfies a required validator. To satisfy
           * a required validator, the given value must be an instance of Date.
           */
          checkRequired(value: any, doc: MongooseDocument): boolean;

          /** Declares a TTL index (rounded to the nearest second) for Date types only. */
          expires(when: number | string): this;

          /**
           * Sets a maximum date validator.
           * @param maximum date
           * @param message optional custom error message
           */
          max(maximum: NativeDate, message?: string): this;

          /**
           * Sets a minimum date validator.
           * @param value minimum date
           * @param message optional custom error message
           */
          min(value: NativeDate, message?: string): this;

          /** This schema type's name, to defend against minifiers that mangle function names. */
          static schemaName: string;
        }

        /*
          * section schema/buffer.js
          * http://mongoosejs.com/docs/api.html#schema-buffer-js
          */
        class Buffer extends SchemaType {
          /** Buffer SchemaType constructor */
          constructor(key: string, options?: any);

          /**
           * Check if the given value satisfies a required validator. To satisfy a
           * required validator, a buffer must not be null or undefined and have
           * non-zero length.
           */
          checkRequired(value: any, doc: MongooseDocument): boolean;

          /** This schema type's name, to defend against minifiers that mangle function names. */
          static schemaName: string;

        }

        /*
          * section schema/boolean.js
          * http://mongoosejs.com/docs/api.html#schema-boolean-js
          */
        class Boolean extends SchemaType {
          /** Boolean SchemaType constructor. */
          constructor(path: string, options?: any);

          /**
           * Check if the given value satisfies a required validator. For a
           * boolean to satisfy a required validator, it must be strictly
           * equal to true or to false.
           */
          checkRequired(value: any): boolean;

          /** This schema type's name, to defend against minifiers that mangle function names. */
          static schemaName: string;
        }

        /*
          * section schema/objectid.js
          * http://mongoosejs.com/docs/api.html#schema-objectid-js
          */
        class ObjectId extends SchemaType {
          /** ObjectId SchemaType constructor. */
          constructor(key: string, options?: any);

          /**
           * Adds an auto-generated ObjectId default if turnOn is true.
           * @param turnOn auto generated ObjectId defaults
           */
          auto(turnOn: boolean): this;

          /** Check if the given value satisfies a required validator. */
          checkRequired(value: any, doc: MongooseDocument): boolean;

          /** This schema type's name, to defend against minifiers that mangle function names. */
          static schemaName: string;
        }
        /*
          * section schema/decimal128.js
          * http://mongoosejs.com/docs/api.html#schema-decimal128-js
          */
        class Decimal128 extends SchemaType {
          /** Decimal128 SchemaType constructor. */
          constructor(key: string, options?: any);

          /** Check if the given value satisfies a required validator. */
          checkRequired(value: any, doc: MongooseDocument): boolean;

          /** This schema type's name, to defend against minifiers that mangle function names. */
          static schemaName: string;
        }

        /*
          * section schema/mixed.js
          * http://mongoosejs.com/docs/api.html#schema-mixed-js
          */
        class Mixed extends SchemaType {
          /** Mixed SchemaType constructor. */
          constructor(path: string, options?: any);

          /** This schema type's name, to defend against minifiers that mangle function names. */
          static schemaName: string;
        }

        /*
          * section schema/embedded.js
          * http://mongoosejs.com/docs/api.html#schema-embedded-js
          */
        class Embedded extends SchemaType {
          /** Sub-schema schematype constructor */
          constructor(schema: Schema, key: string, options?: any);
        }

        /**
         * section schema/map.js
         * https://mongoosejs.com/docs/schematypes.html#maps
         */
        class Map extends SchemaType {
          /** Sub-schema schematype constructor */
          constructor(key: string, options?: any);
        }
      }
    }

    /*
     * section aggregate.js
     * http://mongoosejs.com/docs/api.html#aggregate-js
     */
    export class Aggregate<R> {
      /**
       * Sets an option on this aggregation. This function will be deprecated in a
       * future release. */
      addCursorFlag(flag: string, value: boolean): this;

      /**
       * Appends a new $addFields operator to this aggregate pipeline.
       * Requires MongoDB v3.4+ to work
       */
      addFields(arg: any): this;

      /** Sets the allowDiskUse option for the aggregation query (ignored for < 2.6.0) */
      allowDiskUse(value: boolean): this;

      /** Appends new operators to this aggregate pipeline */
      append(...args: any[]): this;

      /**
       * Executes the query returning a `Promise` which will be
       * resolved with either the doc(s) or rejected with the error.
       * Like [`.then()`](#query_Query-then), but only takes a rejection handler.
       */
      catch: Promise<R>['catch'];

      /** Adds a collation. */
      collation(options: mongodb.CollationOptions): this;

      /** Appends a new $count operator to this aggregate pipeline. */
      count(countName: string): this;

      /**
       * Sets the cursor option for the aggregation query (ignored for < 2.6.0).
       */
      cursor(options?: Record<string, unknown>): this;

      /** Executes the aggregate pipeline on the currently bound Model. If cursor option is set, returns a cursor */
      exec(callback?: Callback<R>): Promise<R> | any;

      /** Execute the aggregation with explain */
      explain(callback?: Callback): Promise<any>;

      /** Combines multiple aggregation pipelines. */
      facet(options: any): this;

      /** Appends new custom $graphLookup operator(s) to this aggregate pipeline, performing a recursive search on a collection. */
      graphLookup(options: any): this;

      /** Appends new custom $group operator to this aggregate pipeline. */
      group(arg: any): this;

      /** Sets the hint option for the aggregation query (ignored for < 3.6.0) */
      hint(value: Record<string, unknown> | string): this;

      /**
       * Appends a new $limit operator to this aggregate pipeline.
       * @param num maximum number of records to pass to the next stage
       */
      limit(num: number): this;

      /** Appends new custom $lookup operator to this aggregate pipeline. */
      lookup(options: any): this;

      /**
       * Appends a new custom $match operator to this aggregate pipeline.
       * @param arg $match operator contents
       */
      match(arg: any): this;

      /**
       * Binds this aggregate to a model.
       * @param model the model to which the aggregate is to be bound
       */
      model(model: any): this;

      /**
       * Append a new $near operator to this aggregation pipeline
       * @param arg $near operator contents
       */
      near(arg: { near?: number[]; distanceField: string; maxDistance?: number; query?: Record<string, any>; includeLocs?: string; num?: number; uniqueDocs?: boolean }): this;

      /** Returns the current pipeline */
      pipeline(): any[];

      /** Appends a new $project operator to this aggregate pipeline. */
      project(arg: string | Object): this;

      /** Sets the readPreference option for the aggregation query. */
      read(pref: string | mongodb.ReadPreferenceMode, tags?: any[]): this;

      /** Sets the readConcern level for the aggregation query. */
      readConcern(level: string): this;

      /** Appends a new $redact operator to this aggregate pipeline. */
      redact(expression: any, thenExpr: string | any, elseExpr: string | any): this;

      /** Appends a new $replaceRoot operator to this aggregate pipeline. */
      replaceRoot(newRoot: object | string): this;

      /**
       * Helper for [Atlas Text Search](https://docs.atlas.mongodb.com/reference/atlas-search/tutorial/)'s
       * `$search` stage.
       */
      search(options: any): this;

      /** Lets you set arbitrary options, for middleware or plugins. */
      option(value: Record<string, unknown>): this;

      /** Appends new custom $sample operator to this aggregate pipeline. */
      sample(size: number): this;

      /** Sets the session for this aggregation. Useful for [transactions](/docs/transactions.html). */
      session(session: mongodb.ClientSession | null): this;

      /**
       * Appends a new $skip operator to this aggregate pipeline.
       * @param num number of records to skip before next stage
       */
      skip(num: number): this;

      /** Appends a new $sort operator to this aggregate pipeline. */
      sort(arg: any): this;

      /** Provides promise for aggregate. */
      then: Promise<R>['then'];

      /**
       * Appends a new $sortByCount operator to this aggregate pipeline. Accepts either a string field name
       * or a pipeline object.
       */
      sortByCount(arg: string | any): this;

      /** Appends new custom $unwind operator(s) to this aggregate pipeline. */
      unwind(...args: any[]): this;
    }

    type Callback<T = any> = (error: CallbackError, result: T) => void;
    type CallbackError = NativeError | null;
    type CallbackWithoutResult = (error: CallbackError) => void;
    export class AggregationCursor extends stream.Readable {
      /**
       * Adds a [cursor flag](http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html#addCursorFlag).
       * Useful for setting the `noCursorTimeout` and `tailable` flags.
       */
      addCursorFlag(flag: string, value: boolean): this;

      /**
       * Marks this cursor as closed. Will stop streaming and subsequent calls to
       * `next()` will error.
       */
      close(): Promise<void>;
      close(callback: CallbackWithoutResult): void;

      /**
       * Execute `fn` for every document(s) in the cursor. If batchSize is provided
       * `fn` will be executed for each batch of documents. If `fn` returns a promise,
       * will wait for the promise to resolve before iterating on to the next one.
       * Returns a promise that resolves when done.
       */
      eachAsync(fn: (doc: any) => any, options?: { parallel?: number, batchSize?: number }): Promise<void>;
      eachAsync(fn: (doc: any) => any, options?: { parallel?: number, batchSize?: number }, cb?: CallbackWithoutResult): void;

      /**
       * Registers a transform function which subsequently maps documents retrieved
       * via the streams interface or `.next()`
       */
      map(fn: (res: any) => any): this;

      /**
       * Get the next document from this cursor. Will return `null` when there are
       * no documents left.
       */
      next(): Promise<any>;
      next(callback: Callback): void;
    }

    /*
     * section schematype.js
     * http://mongoosejs.com/docs/api.html#schematype-js
     */
    class SchemaType {
      /** SchemaType constructor */
      constructor(path: string, options?: any, instance?: string);

      /**
       * Sets a default value for this SchemaType.
       * Defaults can be either functions which return the value to use as the
       * default or the literal value itself. Either way, the value will be cast
       * based on its schema type before being set during document creation.
       * @param val the default value
       */
      default(val: any): any;

      /** Adds a getter to this schematype. */
      get(fn: Function): this;

      /**
       * Declares the index options for this schematype.
       * Indexes are created in the background by default. Specify background: false to override.
       */
      index(options: any | boolean | string): this;

      /**
       * Adds a required validator to this SchemaType. The validator gets added
       * to the front of this SchemaType's validators array using unshift().
       * @param required enable/disable the validator
       * @param message optional custom error message
       */
      required(required: boolean, message?: string): this;

      /** Sets default select() behavior for this path. */
      select(val: boolean): this;
      /** Adds a setter to this schematype. */
      set(fn: Function): this;
      /** Declares a sparse index. */
      sparse(bool: boolean): this;
      /** Declares a full text index. */
      text(bool: boolean): this;
      /** Declares an unique index. */
      unique(bool: boolean): this;

      /**
       * Adds validator(s) for this document path.
       * Validators always receive the value to validate as their first argument
       * and must return Boolean. Returning false means validation failed.
       * @param obj validator
       * @param errorMsg optional error message
       * @param type optional validator type
       */
      validate(obj: RegExp | Function | any, errorMsg?: string,
        type?: string): this;
    }

    /*
     * section promise.js
     * http://mongoosejs.com/docs/api.html#promise-js
     */
    /**
     * To assign your own promise library:
     *
     * 1. Typescript does not allow assigning properties of imported modules.
     *    To avoid compile errors use one of the options below in your code:
     *
     *    - (<any>mongoose).Promise = YOUR_PROMISE;
     *    - require('mongoose').Promise = YOUR_PROMISE;
     *    - import mongoose = require('mongoose');
     *      mongoose.Promise = YOUR_PROMISE;
     *
     * 2. To assign type definitions for your promise library, you will need
     *    to have a .d.ts file with the following code when you compile:
     *
     *    - import * as Q from 'q';
     *      declare module 'mongoose' {
     *        type Promise<T> = Q.promise<T>;
     *      }
     *
     *    - import * as Bluebird from 'bluebird';
     *      declare module 'mongoose' {
     *        type Promise<T> = Bluebird<T>;
     *      }
     *
     * Uses global.Promise by default. If you would like to use mongoose default
     *   mpromise implementation (which is deprecated), you can omit step 1 and
     *   run npm install @types/mongoose-promise
     */
    export var Promise: any;
    export var PromiseProvider: any;

    /*
     * section model.js
     * http://mongoosejs.com/docs/api.html#model-js
     */
    export var Model: Model<any>;
    interface ModelBase<T extends Document, QueryHelpers = {}> {
      /**
       * Model constructor
       * Provides the interface to MongoDB collections as well as creates document instances.
       * @param doc values with which to create the document
       * @event error If listening to this event, it is emitted when a document
       *   was saved without passing a callback and an error occurred. If not
       *   listening, the event bubbles to the connection used to create this Model.
       * @event index Emitted after Model#ensureIndexes completes. If an error
       *   occurred it is passed with the event.
       * @event index-single-start Emitted when an individual index starts within
       *   Model#ensureIndexes. The fields and options being used to build the index
       *   are also passed with the event.
       * @event index-single-done Emitted when an individual index finishes within
       *   Model#ensureIndexes. If an error occurred it is passed with the event.
       *   The fields, options, and index name are also passed.
       */
      new(doc?: LooseType<T>): T;

      /**
       * Requires a replica set running MongoDB >= 3.6.0. Watches the underlying collection for changes using MongoDB change streams.
       * This function does not trigger any middleware. In particular, it does not trigger aggregate middleware.
       * @param options See https://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#watch
       */
      watch(pipeline: any[], options?: mongodb.ChangeStreamOptions & { session?: ClientSession }): mongodb.ChangeStream<LeanDocument<T>>;
      watch(options?: mongodb.ChangeStreamOptions & { session?: ClientSession }): mongodb.ChangeStream<LeanDocument<T>>;

      /**
       * Translate any aliases fields/conditions so the final query or document object is pure
       * @param raw fields/conditions that may contain aliased keys
       * @return the translated 'pure' fields/conditions
       */
      translateAliases(raw: any): any;

      /**
       * Sends multiple insertOne, updateOne, updateMany, replaceOne, deleteOne, and/or deleteMany operations to the MongoDB server in one command. This is faster than sending multiple independent operations (like) if you use create()) because with bulkWrite() there is only one round trip to MongoDB.
       * Mongoose will perform casting on all operations you provide.
       * This function does not trigger any middleware, not save() nor update(). If you need to trigger save() middleware for every document use create() instead.
       * @param writes Operations
       * @param cb callback
       * @return `BulkWriteOpResult` if the operation succeeds
       */
      bulkWrite(writes: any[], cb?: (err: any, res: mongodb.BulkWriteResult) => void): Promise<mongodb.BulkWriteResult>;

      /**
       * Finds a single document by its _id field. findById(id) is almost*
       * equivalent to findOne({ _id: id }). findById() triggers findOne hooks.
       * @param id value of _id to query by
       * @param projection optional fields to return
       */
      findById(id: LooseType<T['_id']>,
        callback?: (err: any, res: T | null) => void): DocumentQuery<T | null> & QueryHelpers;
      findById(id: LooseType<T['_id']>, projection: any,
        callback?: (err: any, res: T | null) => void): DocumentQuery<T | null> & QueryHelpers;
      findById(id: LooseType<T['_id']>, projection: any, options: any,
        callback?: (err: any, res: T | null) => void): DocumentQuery<T | null> & QueryHelpers;

      model<U extends Document>(name: string): Model<U>;

      /**
       * Creates a Query and specifies a $where condition.
       * @param argument is a javascript string or anonymous function
       */
      $where(argument: string | Function): DocumentQuery<T> & QueryHelpers;

      /**
       * Performs aggregations on the models collection.
       * If a callback is passed, the aggregate is executed and a Promise is returned.
       * If a callback is not passed, the aggregate itself is returned.
       * @param aggregations pipeline operator(s) or operator array
       */
      aggregate(aggregations?: any[]): Aggregate<any[]>;
      aggregate(aggregations: any[], cb: Function): Promise<any[]>;

      /** Counts number of matching documents in a database collection. */
      count(conditions: FilterQuery<T>, callback?: (err: any, count: number) => void): Query<number> & QueryHelpers;

      /**
       * Counts number of documents matching `criteria` in a database collection.
       *
       * If you want to count all documents in a large collection,
       * use the `estimatedDocumentCount()` instead.
       * If you call `countDocuments({})`, MongoDB will always execute
       * a full collection scan and **not** use any indexes.
       *
       * @param {Object} filter
       * @param {Function} [callback]
       * @return {Query}
       */
      countDocuments(callback?: (err: any, count: number) => void): Query<number> & QueryHelpers;
      countDocuments(criteria: FilterQuery<T>, callback?: (err: any, count: number) => void): Query<number> & QueryHelpers;

      /**
       * Estimates the number of documents in the MongoDB collection. Faster than
       * using `countDocuments()` for large collections because
       * `estimatedDocumentCount()` uses collection metadata rather than scanning
       * the entire collection.
       *
       * @param {Object} [options]
       * @param {Function} [callback]
       * @return {Query}
       */
      estimatedDocumentCount(callback?: (err: any, count: number) => void): Query<number> & QueryHelpers;
      estimatedDocumentCount(options: any, callback?: (err: any, count: number) => void): Query<number> & QueryHelpers;

      /**
       * Shortcut for saving one or more documents to the database. MyModel.create(docs)
       * does new MyModel(doc).save() for every doc in docs.
       * Triggers the save() hook.
       */
      create(docs: LooseType<T>[]): Promise<T[]>;
      create(docs: LooseType<T>[], callback: (err: any, res: T[]) => void): Promise<T[]>;
      create(docs: LooseType<T>[], options: SaveOptions): Promise<T[]>;
      create(docs: LooseType<T>[], options: SaveOptions, callback: (err: any, res: T[]) => void): Promise<T[]>;

      create(doc: LooseType<T>): Promise<T>;
      create(doc: LooseType<T>, callback: (err: any, res: T[]) => void): Promise<T>;
      create(doc: LooseType<T>, options: SaveOptions): Promise<T>;
      create(doc: LooseType<T>, options: SaveOptions, callback: (err: any, res: T) => void): Promise<T>;

      create(...docs: LooseType<T>[]): Promise<T>;

      /**
       * Create the collection for this model. By default, if no indexes are specified, mongoose will not create the
       * collection for the model until any documents are created. Use this method to create the collection explicitly.
       */
      createCollection(options?: mongodb.CreateCollectionOptions, cb?: (err: any) => void): Promise<void>;

      /**
       * Adds a discriminator type.
       * @param name discriminator model name
       * @param schema discriminator model schema
       * @param value the string stored in the `discriminatorKey` property
       */
      discriminator<U extends Document>(name: string, schema: Schema, value?: string): Model<U>;

      /**
       * Adds a discriminator type.
       * @param name discriminator model name
       * @param schema discriminator model schema
       * @param value the string stored in the `discriminatorKey` property
       */
      discriminator<U extends Document, M extends Model<U>>(name: string, schema: Schema, value?: string): M;

      /** Creates a Query for a distinct operation. Passing a callback immediately executes the query. */
      distinct(field: string, callback?: (err: any, res: any[]) => void): Query<any[]> & QueryHelpers;
      distinct(field: string, conditions: any,
        callback?: (err: any, res: any[]) => void): Query<any[]> & QueryHelpers;

      /**
       * Makes the indexes in MongoDB match the indexes defined in this model's
       * schema. This function will drop any indexes that are not defined in
       * the model's schema except the `_id` index, and build any indexes that
       * are in your schema but not in MongoDB.
       * @param options options to pass to `ensureIndexes()`
       * @param callback optional callback
       * @return Returns `undefined` if callback is specified, returns a promise if no callback.
       */
      syncIndexes(options: object, callback?: (err: any) => void): void;
      syncIndexes(options: object): Promise<void>;

      /**
       * Lists the indexes currently defined in MongoDB. This may or may not be
       * the same as the indexes defined in your schema depending on whether you
       * use the [`autoIndex` option](/docs/guide.html#autoIndex) and if you
       * build indexes manually.
       * @param cb optional callback
       * @return Returns `undefined` if callback is specified, returns a promise if no callback.
       */
      listIndexes(callback: (err: any) => void): void;
      listIndexes(): Promise<void>;

      /**
       * Sends ensureIndex commands to mongo for each index declared in the schema.
       * @param options internal options
       * @param cb optional callback
       */
      ensureIndexes(callback?: (err: any) => void): Promise<void>;
      ensureIndexes(options: any, callback?: (err: any) => void): Promise<void>;

      /**
       * Similar to ensureIndexes(), except for it uses the createIndex function. The ensureIndex() function checks to see if an index with that name already exists, and, if not, does not attempt to create the index. createIndex() bypasses this check.
       * @param cb Optional callback
       */
      createIndexes(cb?: (err: any) => void): Promise<void>;

      /**
       * Returns true if at least one document exists in the database that matches
       * the given `filter`, and false otherwise.
       */
      exists(filter: any, callback?: (err: any, res: boolean) => void): Promise<boolean>;

      /**
       * Finds documents.
       * @param projection optional fields to return
       */
      find(callback?: (err: any, res: T[]) => void): DocumentQuery<T[]> & QueryHelpers;
      find(conditions: FilterQuery<T>, callback?: (err: any, res: T[]) => void): DocumentQuery<T[]> & QueryHelpers;
      find(conditions: FilterQuery<T>, projection?: any | null,
        callback?: (err: any, res: T[]) => void): DocumentQuery<T[]> & QueryHelpers;
      find(conditions: FilterQuery<T>, projection?: any | null, options?: any | null,
        callback?: (err: any, res: T[]) => void): DocumentQuery<T[]> & QueryHelpers;



      /**
       * Issue a mongodb findAndModify remove command by a document's _id field.
       * findByIdAndRemove(id, ...) is equivalent to findOneAndRemove({ _id: id }, ...).
       * Finds a matching document, removes it, passing the found document (if any) to the callback.
       * Executes immediately if callback is passed, else a Query object is returned.
       *
       * If mongoose option 'useFindAndModify': set to false it uses native findOneAndUpdate() rather than deprecated findAndModify().
       * https://mongoosejs.com/docs/api.html#mongoose_Mongoose-set
       *
       * Note: same signatures as findByIdAndDelete
       *
       * @param id value of _id to query by
       */
      findByIdAndRemove(): DocumentQuery<T | null> & QueryHelpers;
      findByIdAndRemove(id: LooseType<T['_id']>,
        callback?: (err: any, res: T | null) => void): DocumentQuery<T | null> & QueryHelpers;
      findByIdAndRemove(id: LooseType<T['_id']>, options: QueryFindOneAndRemoveOptions,
        callback?: (err: any, res: mongodb.ModifyResult<T | null>) => void)
          : Query<mongodb.ModifyResult<T | null>> & QueryHelpers;
      findByIdAndRemove(id: LooseType<T['_id']>, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null> & QueryHelpers;


       /**
       * Issue a mongodb findOneAndDelete command by a document's _id field.
       * findByIdAndDelete(id, ...) is equivalent to findByIdAndDelete({ _id: id }, ...).
       * Finds a matching document, removes it, passing the found document (if any) to the callback.
       * Executes immediately if callback is passed, else a Query object is returned.
       *
       * Note: same signatures as findByIdAndRemove
       *
       * @param id value of _id to query by
       */
      findByIdAndDelete(): DocumentQuery<T | null> & QueryHelpers;
      findByIdAndDelete(id: LooseType<T['_id']>,
        callback?: (err: any, res: T | null) => void): DocumentQuery<T | null> & QueryHelpers;
      findByIdAndDelete(id: LooseType<T['_id']>, options: QueryFindOneAndRemoveOptions,
        callback?: (err: any, res: mongodb.ModifyResult<T | null>) => void)
          : Query<mongodb.ModifyResult<T | null>> & QueryHelpers;
      findByIdAndDelete(id: LooseType<T['_id']>, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null> & QueryHelpers;

      /**
       * Issues a mongodb findAndModify update command by a document's _id field. findByIdAndUpdate(id, ...)
       * is equivalent to findOneAndUpdate({ _id: id }, ...).
       *
       * If mongoose option 'useFindAndModify': set to false it uses native findOneAndUpdate() rather than deprecated findAndModify().
       * https://mongoosejs.com/docs/api.html#mongoose_Mongoose-set
       *
       * @param id value of _id to query by
       */
      findByIdAndUpdate(): DocumentQuery<T | null> & QueryHelpers;
      findByIdAndUpdate(id: LooseType<T['_id']>, update: any,
        callback?: (err: any, res: T | null) => void): DocumentQuery<T | null> & QueryHelpers;
      findByIdAndUpdate(id: LooseType<T['_id']>, update: any,
        options: { rawResult: true } & { upsert: true } & { new: true } & QueryFindOneAndUpdateOptions,
        callback?: (err: any, res: T) => void): DocumentQuery<T> & QueryHelpers;
      findByIdAndUpdate(id: LooseType<T['_id']>, update: any,
        options: { upsert: true, new: true } & QueryFindOneAndUpdateOptions,
        callback?: (err: any, res: mongodb.ModifyResult<T>) => void)
          : Query<mongodb.ModifyResult<T>> & QueryHelpers;
      findByIdAndUpdate(id: LooseType<T['_id']>, update: any,
        options: { rawResult : true } & QueryFindOneAndUpdateOptions,
        callback?: (err: any, res: mongodb.ModifyResult<T | null>) => void)
          : Query<mongodb.ModifyResult<T | null>> & QueryHelpers;
      findByIdAndUpdate(id: LooseType<T['_id']>, update: any,
        options: QueryFindOneAndUpdateOptions,
        callback?: (err: any, res: T | null) => void): DocumentQuery<T | null> & QueryHelpers;

      /**
       * Finds one document.
       * The conditions are cast to their respective SchemaTypes before the command is sent.
       * @param projection optional fields to return
       */
      findOne(conditions?: FilterQuery<T>,
        callback?: (err: any, res: T | null) => void): DocumentQuery<T | null> & QueryHelpers;
      findOne(conditions: FilterQuery<T>, projection: any,
        callback?: (err: any, res: T | null) => void): DocumentQuery<T | null> & QueryHelpers;
      findOne(conditions: FilterQuery<T>, projection: any, options: any,
        callback?: (err: any, res: T | null) => void): DocumentQuery<T | null> & QueryHelpers;

      /**
       * Issue a mongodb findAndModify remove command.
       * Finds a matching document, removes it, passing the found document (if any) to the callback.
       * Executes immediately if callback is passed else a Query object is returned.
       *
       * If mongoose option 'useFindAndModify': set to false it uses native findOneAndUpdate() rather than deprecated findAndModify().
       * https://mongoosejs.com/docs/api.html#mongoose_Mongoose-set
       *
       * Note: same signatures as findOneAndDelete
       *
       */
      findOneAndRemove(): DocumentQuery<T | null> & QueryHelpers;
      findOneAndRemove(conditions: FilterQuery<T>,
        callback?: (err: any, res: T | null) => void): DocumentQuery<T | null> & QueryHelpers;
      findOneAndRemove(conditions: FilterQuery<T>, options: { rawResult: true } & QueryFindOneAndRemoveOptions,
        callback?: (err: any, doc: mongodb.ModifyResult<T | null>, res: any) => void)
          : Query<mongodb.ModifyResult<T | null>> & QueryHelpers;
      findOneAndRemove(conditions: FilterQuery<T>, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null> & QueryHelpers;

      /**
       * Issues a mongodb findOneAndDelete command.
       * Finds a matching document, removes it, passing the found document (if any) to the
       * callback. Executes immediately if callback is passed.
       *
       * Note: same signatures as findOneAndRemove
       *
       */
      findOneAndDelete(): DocumentQuery<T | null> & QueryHelpers;
      findOneAndDelete(conditions: FilterQuery<T>,
        callback?: (err: any, res: T | null) => void): DocumentQuery<T | null> & QueryHelpers;
      findOneAndDelete(conditions: FilterQuery<T>, options: { rawResult: true } & QueryFindOneAndRemoveOptions,
        callback?: (err: any, doc: mongodb.ModifyResult<T | null>, res: any) => void)
          : Query<mongodb.ModifyResult<T | null>> & QueryHelpers;
      findOneAndDelete(conditions: FilterQuery<T>, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null> & QueryHelpers;

      /**
       * Issues a mongodb findAndModify update command.
       * Finds a matching document, updates it according to the update arg, passing any options,
       * and returns the found document (if any) to the callback. The query executes immediately
       * if callback is passed else a Query object is returned.
       *
  +    * If mongoose option 'useFindAndModify': set to false it uses native findOneAndUpdate() rather than the deprecated findAndModify().
  +    * https://mongoosejs.com/docs/api.html#mongoose_Mongoose-set
       */
      findOneAndUpdate(): DocumentQuery<T | null> & QueryHelpers;
      findOneAndUpdate(conditions: FilterQuery<T>, update: any,
        callback?: (err: any, doc: T | null, res: any) => void): DocumentQuery<T | null> & QueryHelpers;
      findOneAndUpdate(conditions: FilterQuery<T>, update: any,
        options: { rawResult : true } & { upsert: true, new: true } & QueryFindOneAndUpdateOptions,
        callback?: (err: any, doc: mongodb.ModifyResult<T>, res: any) => void)
          : Query<mongodb.ModifyResult<T>> & QueryHelpers;
      findOneAndUpdate(conditions: FilterQuery<T>, update: any,
        options: { upsert: true, new: true } & QueryFindOneAndUpdateOptions,
        callback?: (err: any, doc: T, res: any) => void): DocumentQuery<T> & QueryHelpers;
      findOneAndUpdate(conditions: FilterQuery<T>, update: any,
        options: { rawResult: true } & QueryFindOneAndUpdateOptions,
        callback?: (err: any, doc: mongodb.ModifyResult<T | null>, res: any) => void)
          : Query<mongodb.ModifyResult<T | null>> & QueryHelpers;
      findOneAndUpdate(conditions: FilterQuery<T>, update: any,
        options: QueryFindOneAndUpdateOptions,
        callback?: (err: any, doc: T | null, res: any) => void): DocumentQuery<T | null> & QueryHelpers;

      /**
       * Implements $geoSearch functionality for Mongoose
       * @param conditions an object that specifies the match condition (required)
       * @param options for the geoSearch, some (near, maxDistance) are required
       * @param callback optional callback
       */
      geoSearch(conditions: any, options: {
        /** x,y point to search for */
        near: number[];
        /** the maximum distance from the point near that a result can be */
        maxDistance: number;
        /** The maximum number of results to return */
        limit?: number;
        /** return the raw object instead of the Mongoose Model */
        lean?: boolean;
      }, callback?: (err: any, res: T[]) => void): DocumentQuery<T[]> & QueryHelpers;

      /**
       * Shortcut for creating a new Document from existing raw data,
       * pre-saved in the DB. The document returned has no paths marked
       * as modified initially.
       */
      hydrate(obj: LooseType<T>): T;

      /**
       * Shortcut for validating an array of documents and inserting them into
       * MongoDB if they're all valid. This function is faster than .create()
       * because it only sends one operation to the server, rather than one for each
       * document.
       * This function does not trigger save middleware.
       * @param docs Documents to insert.
       * @param options Optional settings.
       * @param options.ordered  if true, will fail fast on the first error encountered.
       *        If false, will insert all the documents it can and report errors later.
       * @param options.rawResult if false, the returned promise resolves to the documents that passed mongoose document validation.
       *        If `false`, will return the [raw result from the MongoDB driver](http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#~insertWriteOpCallback)
       *        with a `mongoose` property that contains `validationErrors` if this is an unordered `insertMany`.
       */
      insertMany(docs: LooseType<T>[], callback?: (error: any, docs: T[]) => void): Promise<T[]>;
      insertMany(docs: LooseType<T>[], options?: { ordered?: boolean, rawResult?: boolean } & ModelOptions, callback?: (error: any, docs: T[]) => void): Promise<T[]>;
      insertMany(doc: LooseType<T>, callback?: (error: any, doc: T) => void): Promise<T>;
      insertMany(doc: LooseType<T>, options?: { ordered?: boolean, rawResult?: boolean } & ModelOptions, callback?: (error: any, doc: T) => void): Promise<T>;

      /**
       * Performs any async initialization of this model against MongoDB.
       * This function is called automatically, so you don't need to call it.
       * This function is also idempotent, so you may call it to get back a promise
       * that will resolve when your indexes are finished building as an alternative
       * to `MyModel.on('index')`
       * @param callback optional
       */
      init(callback?: (err: any) => void): Promise<T>;

      /**
       * Executes a mapReduce command.
       * @param o an object specifying map-reduce options
       * @param callbackoptional callback
       */
      mapReduce<Key, Value>(
        o: ModelMapReduceOption<T, Key, Value>,
        callback?: (err: any, res: any) => void
      ): Promise<any>;

      /**
       * Populates document references.
       * @param docs Either a single document or array of documents to populate.
       * @param options A hash of key/val (path, options) used for population.
       * @param callback Optional callback, executed upon completion. Receives err and the doc(s).
       */
      populate(docs: any[], options: ModelPopulateOptions | ModelPopulateOptions[],
        callback?: (err: any, res: T[]) => void): Promise<T[]>;
      populate<T>(docs: any, options: ModelPopulateOptions | ModelPopulateOptions[],
        callback?: (err: any, res: T) => void): Promise<T>;

      /** Removes documents from the collection. */
      remove(conditions: FilterQuery<T>, callback?: (err: any) => void): Query<mongodb.DeleteResult> & QueryHelpers;
      deleteOne(conditions: FilterQuery<T>, callback?: (err: any) => void): Query<mongodb.DeleteResult> & QueryHelpers;
      deleteMany(conditions: FilterQuery<T>, callback?: (err: any) => void): Query<mongodb.DeleteResult> & QueryHelpers;

      /**
       * Same as update(), except MongoDB replace the existing document with the given document (no atomic operators like $set).
       * This function triggers the following middleware: replaceOne
       */
      replaceOne(conditions: any, replacement: any, callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;

      /**
       * Updates documents in the database without returning them.
       * All update values are cast to their appropriate SchemaTypes before being sent.
       */
      update(conditions: FilterQuery<T>, doc: any,
        callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;
      update(conditions: FilterQuery<T>, doc: any, options: ModelUpdateOptions,
        callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;
      updateOne(conditions: FilterQuery<T>, doc: any,
        callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;
      updateOne(conditions: FilterQuery<T>, doc: any, options: ModelUpdateOptions,
        callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;
      updateMany(conditions: FilterQuery<T>, doc: any,
        callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;
      updateMany(conditions: FilterQuery<T>, doc: any, options: ModelUpdateOptions,
        callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;

      /** Creates a Query, applies the passed conditions, and returns the Query. */
      where(path: string, val?: any): Query<any> & QueryHelpers;
    }
    type Model<T extends Document, StaticFuncs extends object = {}, QueryHelpers = {}> =
        ModelBase<T, QueryHelpers>
        & _TypeHelpers.Unconstructable<StaticFuncs>
        & NodeJS.EventEmitter
        & ModelProperties;

    interface DocumentInterface {
      /** Signal that we desire an increment of this documents version. */
      increment?(): this;

      /**
       * Returns another Model instance.
       * @param name model name
       */
      model?<T extends Document>(name: string): Model<T>;

      /** Override whether mongoose thinks this doc is deleted or not */
      $isDeleted?(isDeleted: boolean): void;
      /** whether mongoose thinks this doc is deleted. */
      $isDeleted?(): boolean;

      /**
       * Removes this document from the db.
       * @param fn optional callback
       */
      remove?(fn?: (err: any, product: this) => void): Promise<this>;

      /**
       * Saves this document.
       *
       * Note on types: In some cases typescript can't figure out the type
       * of "this" correctly; in that case you can provide an override type
       * if you want
       * @param options options optional options
       * @param options.safe overrides schema's safe option
       * @param options.validateBeforeSave set to false to save without validating.
       * @param fn optional callback
       */
      save?(): Promise<this>;
      save?(options: SaveOptions): Promise<this>;
      save?(fn: (err: any, product: this) => void): Promise<this>;
      save?(options: SaveOptions, fn?: (err: any, product: this) => void): Promise<this>;

      /**
       * Version using default version key. See http://mongoosejs.com/docs/guide.html#versionKey
       * If you're using another key, you will have to access it using []: doc[_myVersionKey]
       */
      __v?: number;
    }
    type Document<DocType extends object = {}> = DocumentInterface & MongooseDocument<DocType> & NodeJS.EventEmitter & ModelProperties;

    interface SaveOptions {
      safe?: boolean | WriteConcern;
      validateBeforeSave?: boolean;
      session?: ClientSession;
    }

    interface WriteConcern {
      j?: boolean;
      w?: number | 'majority' | TagSet;
      wtimeout?: number;
    }

    interface TagSet {
      [k: string]: string;
    }

    interface ModelProperties {
      /** Base Mongoose instance the model uses. */
      base: typeof mongoose;

      /**
       * If this is a discriminator model, baseModelName is the
       * name of the base model.
       */
      baseModelName: string | undefined;

      /** Collection the model uses. */
      collection: Collection;

      /** Connection the model uses. */
      db: Connection;

      /** Registered discriminators for this model. */
      discriminators: any;

      /** The name of the model */
      modelName: string;

      /** Schema the model uses. */
      schema: Schema;
    }

    /** https://mongoosejs.com/docs/api.html#query_Query-setOptions */
    interface ModelOptions {
      session?: ClientSession | null;
    }

    interface QueryPopulateOptions {
      /** space delimited path(s) to populate */
      path: string;
      /** optional fields to select */
      select?: any;
      /** optional query conditions to match */
      match?: any;
      /** optional model to use for population */
      model?: string | Model<any>;
      /** optional query options like sort, limit, etc */
      options?: any;
      /** deep populate */
      populate?: QueryPopulateOptions | QueryPopulateOptions[];
    }

    interface ModelPopulateOptions extends QueryPopulateOptions {
      /** optional, if true Mongoose will always set path to an array. Inferred from schema by default */
      justOne?: boolean;
    }

    interface ModelUpdateOptions extends ModelOptions {
      /** safe mode (defaults to value set in schema (true)) */
      safe?: boolean;
      /** whether to create the doc if it doesn't match (false) */
      upsert?: boolean;
      /** whether multiple documents should be updated (false) */
      multi?: boolean;
      /**
       * If true, runs update validators on this command. Update validators validate
       * the update operation against the model's schema.
       */
      runValidators?: boolean;
      /**
       * If this and upsert are true, mongoose will apply the defaults specified in the
       * model's schema if a new document is created. This option only works on MongoDB >= 2.4
       * because it relies on MongoDB's $setOnInsert operator.
       */
      setDefaultsOnInsert?: boolean;
      /** overrides the strict option for this update */
      strict?: boolean;
      /** disables update-only mode, allowing you to overwrite the doc (false) */
      overwrite?: boolean;
      /** other options */
      [other: string]: any;
      /**
       *  by default, mongoose only returns the first error that occurred in casting the query.
       *  Turn on this option to aggregate all the cast errors.
       */
        multipleCastError?: boolean;
    }

    interface ModelMapReduceOption<T, Key, Val> {
      map: Function | string;
      reduce: (key: Key, vals: T[]) => Val;
      /** query filter object. */
      query?: any;
      /** sort input objects using this key */
      sort?: any;
      /** max number of documents */
      limit?: number;
      /** keep temporary data default: false */
      keeptemp?: boolean;
      /** finalize function */
      finalize?: (key: Key, val: Val) => Val;
      /** scope variables exposed to map/reduce/finalize during execution */
      scope?: any;
      /** it is possible to make the execution stay in JS. Provided in MongoDB > 2.0.X default: false */
      jsMode?: boolean;
      /** provide statistics on job execution time. default: false */
      verbose?: boolean;
      readPreference?: string;
      /** sets the output target for the map reduce job. default: {inline: 1} */
      out?: {
        /** the results are returned in an array */
        inline?: number;
        /**
         * {replace: 'collectionName'} add the results to collectionName: the
         * results replace the collection
         */
        replace?: string;
        /**
         * {reduce: 'collectionName'} add the results to collectionName: if
         * dups are detected, uses the reducer / finalize functions
         */
        reduce?: string;
        /**
         * {merge: 'collectionName'} add the results to collectionName: if
         * dups exist the new docs overwrite the old
         */
        merge?: string;
      };
    }

    interface MapReduceResult<Key, Val> {
      _id: Key;
      value: Val;
    }

    /*
     * section collection.js
     * http://mongoosejs.com/docs/api.html#collection-js
     */
    interface CollectionBase extends mongodb.Collection {
      /*
        * Abstract methods. Some of these are already defined on the
        * mongodb.Collection interface so they've been commented out.
        */
      ensureIndex(...args: any[]): any;
      //find(...args: any[]): any;
      findAndModify(...args: any[]): any;
      //findOne(...args: any[]): any;
      getIndexes(...args: any[]): any;
      //insert(...args: any[]): any;
      //mapReduce(...args: any[]): any;
      //save(...args: any[]): any;
      //update(...args: any[]): any;

      /** The collection name */
      collectionName: string;
      /** The Connection instance */
      conn: Connection;
      /** The collection name */
      name: string;
    }

    // Advanced type unit tests
    export namespace AUT_Tests {
      type Yes = AUT.Yes;
      type No = AUT.No;
      type Invert<T> = AUT.Invert<T>;
      type TypeEquals<X, Y> = AUT.TypeEquals<X, Y>;
      type TypeExtends<X, Y> = AUT.TypeExtends<X, Y>;
      type NotAny<T> = AUT.NotAny<T>;
      type IsTrue<T> = AUT.IsTrue<T>;
      interface TestSubdocObject {
        strFieldInSub: string;
        numFieldInSub: number;
        boolFieldInSub: boolean;
        trueFieldInSub?: true;
        falseFieldInSub: false;
        strLitFieldInSub: 'foo';
        strEnumFieldInSub: 'foo' | 'bar' | 'baz';
        strArrFieldInSub: Types.Array<string>;
        numArrFieldInSub: Types.Array<number>;

        fooFunction(): void;
      }

      type LeanNull = LeanDocument<null>;
      type t_LeanNulIsNull = TypeEquals<LeanNull, null>;

      type TestSubdocObjectNoFunc = _TypeHelpers.ExcludeFunctions<TestSubdocObject>;
      type f = keyof TestSubdocObjectNoFunc;
      type TestSubdoc = Types.Subdocument<TestSubdocObject>;
      type LeanTestSubdoc = LeanDocument<TestSubdoc>;

      type t_ArrayIsCompatible1 = TypeEquals<string[], Array<string>>;
      type t_ArrayIsCompatible2 = TypeEquals<Array<string>, string[]>;
      // At present this doesn't work; maybe it shouldn't
      type t_DocArrayIsCompatible1 = TypeExtends<Types.DocumentArray<TestSubdoc>, TestSubdoc[]>;
      type t_DocArrayIsCompatible2 = TypeExtends<TestSubdoc[], Types.DocumentArray<TestSubdoc>>;

      interface StrMap {
          [key: string]: string;
      }
      type asdf = keyof StrMap;
      type LeanStrMap = LeanDocument<StrMap>;
      // type TypeOfStrMap = TypeOfDocument<StrMap>;
      type t_StrMapTypeNotObject = Invert<AUT.TypeEquals<LeanStrMap, object>>;

      // The following isn't possible because of a quirk in how typescript infers types for things like StrMap
      // type t_StrMapTypeIsStrMap = AUT.TypeEquals<StrMap, LeanStrMap>;

      type t_FunctionsWereThere = TypeExtends<'fooFunction', keyof TestSubdoc>;
      type t_FunctionsAreRemoved = Invert<TypeExtends<'fooFunction', keyof LeanTestSubdoc>>;

      // Tests to make sure that the subdocument type is working correctly
      type SubdocArrayFields = AUT.ArrayFieldsOf<TestSubdocObject>;
      type SubdocNonarrayFields = Exclude<keyof TestSubdocObject, SubdocArrayFields | 'fooFunction'>;

      type SubDocFieldsRetainTypesObj = AUT.FieldsCheckEqual<TestSubdocObject, TestSubdoc, keyof TestSubdocObject>;
      type t_SubDocFieldsRetainTypesAllSame = AUT.FieldsConfirmCheck<SubDocFieldsRetainTypesObj>;
      type LeanDocFieldsRetainTypesObj = AUT.FieldsCheckEqual<TestSubdocObjectNoFunc, LeanDocument<TestSubdoc>, SubdocNonarrayFields>;
      type t_LeanDocFieldsRetainTypesObj = AUT.FieldsConfirmCheck<LeanDocFieldsRetainTypesObj>;

      type t_SubDocHasSubdocFields = TypeExtends<'ownerDocument', keyof TestSubdoc>;
      type t_LeanSubDocNoHasSubdocFields = Invert<TypeExtends<'ownerDocument', keyof LeanTestSubdoc>>;

      interface TestDocObject {
          _id: Types.ObjectId;
          strField: string;
          numField: number;
          boolField: boolean;
          trueField: true;
          falseField: false;
          strLitField: 'foo';
          strEnumField: 'foo' | 'bar' | 'baz';
          strArrField: Types.Array<string>;
          numArrField: Types.Array<number>;

          subDocField: TestSubdoc;
          subDocArray: Types.DocumentArray<TestSubdoc>;
      }
      type TestDoc = Document<TestDocObject>;
      type TestDocFields = keyof TestDocObject;
      type LeanTestDoc = LeanDocument<TestDoc>;
      type LeanTestDocFields = keyof LeanTestDoc;

      type LeanArrField = LeanTestDoc['strArrField'];
      type t_LeanDocStringArray = TypeEquals<LeanArrField, string[]>;

      // TODO: Fix TypeEquals to work fully with union types
      // type t_LeanDocFieldNamesSameAsBaseDoc = TypeEquals<TestDocFields, LeanTestDocFields>;

      // Test that the return value of Save is correct
      type SaveRetVal = ReturnType<NotUndef<TestDoc['save']>>;
      type t_SaveRetValCorrect = TypeEquals<SaveRetVal, Promise<TestDoc>>;

      // Test the basic array type to make sure it works
      type StringArray = string[];
      type StringMongooseArray = Types.Array<string>;
      type t_StrArrayTypeCorrect = TypeEquals<StringArray[number], StringMongooseArray[number]>
      type t_StrMongooseArrayHas = TypeExtends<StringMongooseArray['$shift'], Function>;

      // Test the Document array type and make sure it works
      type TestSubdocArray = Types.DocumentArray<TestSubdoc>;
      type t_DocArrayTypeCorrect = TypeEquals<TestSubdocArray[number], TestSubdoc>;
      type t_DocArrayHasSpecial = TypeExtends<TestSubdocArray['create'], Function>;

      // Test the DocumentArray in a lean document
      type LeanTestSubDocArray = LeanDocumentOrArray<TestSubdocArray>;
      // TODO: figure out a better way to test this, this test isn't valid
      // type t_LeanDocArrayTypeCorrect = TypeEquals<LeanTestDoc['subDocArray'][number], LeanTestSubDocArray>;
      type LeanDocArrayType = LeanTestSubDocArray[number];
      type t_LeanDocArrayNotAny = NotAny<LeanDocArrayType>;
      type t_LeanDocInArrayTypeCorrect = TypeEquals<[LeanTestSubDocArray[number]], [LeanTestSubdoc]>;

      type SubDocArrayType = TestSubdocArray[number];
      type LeanDocSubDocArrayType = LeanTestDoc['subDocArray'];
      type LeanSubDocArrayType = LeanTestDoc['subDocArray'][number];
      type t_GetArrayTypeFromSubdocArray = TypeEquals<SubDocArrayType, TestSubdoc>;
      type t_LeanSubDocArrayTypeExtracted = NotAny<LeanSubDocArrayType>;

      type t_LeanSubDocArrayNotAny = NotAny<LeanDocSubDocArrayType[number]>;

      // type GetArrayType<T extends any[]> = T[number];
      // // Test GetArrayType
      // type t_GetArrayTypeString = TypeEquals<string, GetArrayType<string[]>>;
      // type t_GetArrayTypeNotString = TypeEquals<string, GetArrayType<string>>;
      // type t_GetArrayTypeNumber = TypeEquals<number, GetArrayType<number[]>>;
      // type t_GetArrayTypeBool = TypeEquals<boolean, GetArrayType<boolean[]>>;
      // type t_GetArrayTypeNumArray = TypeEquals<number[], GetArrayType<number[][]>>;

      // Test the Document type

      // Check that the types made it correctly into the Document object
      type DocFieldsRetainTypesObj = AUT.FieldsCheckEqual<TestDocObject, TestDoc, keyof TestDocObject>;
      type t_DocFieldsRetainTypesAllSame = AUT.FieldsConfirmCheck<DocFieldsRetainTypesObj>;

      type UnchangedLeanTestDocFields = Exclude<TestDocFields, 'subDocField'|'subDocArray'|'numArrField'|'strArrField'>;
      type LeanDocFieldsRetainNonArrTypesObj = AUT.FieldsCheckEqual<TestDocObject, LeanTestDoc, UnchangedLeanTestDocFields>;
      type t_LeanDocFieldsRetainNonArrTypesObj = AUT.FieldsConfirmCheck<LeanDocFieldsRetainNonArrTypesObj>;
      type t_LeanDocArrayFieldsTypesMatch = TypeEquals<LeanTestDoc['strArrField'][number], string>;
      type t_LeanDocArrayFieldsTypesMatch2 = TypeEquals<LeanTestDoc['numArrField'][number], number>;
      type foo1 = [keyof LeanTestDoc['subDocArray'][number]];
      // type AUT_Tests.foo1 = ["strFieldInSub" | "numFieldInSub" | "boolFieldInSub" | "trueFieldInSub" | "falseFieldInSub" | "strLitFieldInSub" | "strEnumFieldInSub" | "strArrFieldInSub" | "numArrFieldInSub"]
      type foo2 = [keyof Omit<TestSubdocObject, 'fooFunction'>];
      // type AUT_Tests.foo2 = ["fooFunction" | "strFieldInSub" | "numFieldInSub" | "boolFieldInSub" | "trueFieldInSub" | "falseFieldInSub" | "strLitFieldInSub" | "strEnumFieldInSub" | "strArrFieldInSub" | "numArrFieldInSub"]
      type t_LeanDocArrayFieldsTypesMatch3 = TypeEquals<[keyof LeanTestDoc['subDocArray'][number]], [keyof Omit<TestSubdocObject, 'fooFunction'>]>;

      type t_DocHasDocFields = TypeExtends<'$isDeleted', keyof TestDoc>;
      type t_LeanDocNoHasDocFields = Invert<TypeExtends<'ownerDocument', keyof LeanTestDoc>>;

      type TESTAGG_DocTests1 = NotAny<Yes
          & t_SaveRetValCorrect
          & t_LeanDocNoHasDocFields & t_DocHasDocFields
          & t_LeanDocFieldsRetainNonArrTypesObj & t_DocFieldsRetainTypesAllSame
          & t_LeanSubDocArrayNotAny & t_LeanDocArrayNotAny & t_LeanSubDocArrayTypeExtracted
          & t_GetArrayTypeFromSubdocArray
          & t_LeanDocInArrayTypeCorrect & t_DocArrayHasSpecial// & t_LeanDocArrayTypeCorrect
          & t_LeanNulIsNull
      >;

      type TESTAGG_DocTests2 = NotAny<Yes
          & t_DocArrayTypeCorrect & t_StrMongooseArrayHas & t_StrArrayTypeCorrect
          & t_LeanSubDocNoHasSubdocFields & t_SubDocHasSubdocFields & t_LeanDocFieldsRetainTypesObj
          & t_SubDocFieldsRetainTypesAllSame & t_FunctionsAreRemoved & t_FunctionsWereThere
          & t_StrMapTypeNotObject// & t_StrMapTypeIsStrMap
          & t_ArrayIsCompatible1 & t_ArrayIsCompatible2
          & t_DocArrayIsCompatible1 //& t_DocArrayIsCompatible2
      >;

      // Loose Type tests
      type LooseObjectId = LooseElementType<Types.ObjectId>;
      type t_LooseTypeObjectIdString = TypeExtends<string, LooseObjectId>;
      type t_LooseTypeObjectIdOid = TypeExtends<Types.ObjectId, LooseObjectId>;
      type t_LooseTypeObjectIdDoc = TypeExtends<TestDoc, LooseObjectId>;
      type t_LooseTypeObjectIdNum = Invert<TypeExtends<number, LooseObjectId>>;

      type t_LooseTypeDateDate = TypeExtends<Date, LooseElementType<Date>>;
      type t_LooseTypeDateBoolean = Invert<TypeExtends<boolean, LooseElementType<Date>>>;
      type t_LooseTypeDateNumber = TypeExtends<number, LooseElementType<Date>>;

      interface ComplexObject {
          foo: Types.ObjectId;
          num: number;
          strUnion: 'asdf' | 'fdsa' | 'thingy';
          objArr: Types.ObjectId[];
          doc: {a: Date, b: Types.ObjectId, num: number},
          docArr: Types.DocumentArray<{a: Date, b: Types.ObjectId, num: number}>
      }
      type LooseComplexObject = LooseType<ComplexObject>;

      /** Used to check types which could be undefined because they are optional */
      type NotUndef<T> = T extends undefined ? never : T;

      type t_LooseTypeComplexBaseUnchanged = TypeEquals<ComplexObject['num'], NotUndef<LooseComplexObject['num']>>;
      type t_LooseTypeComplexBaseUnchangedNeg = Invert<TypeEquals<boolean, LooseComplexObject['num']>>;
      type t_LooseTypeComplexBaseChanged = TypeExtends<[string], [LooseComplexObject['foo']]>;
      type t_LooseTypeComplexBaseChangedNeg = Invert<TypeExtends<number, LooseComplexObject['foo']>>;
      type t_LooseTypeComplexBaseArrChanged = TypeExtends<string, NotUndef<LooseComplexObject['objArr']>[number]>;
      type t_LooseTypeComplexBaseArrChangedNeg = Invert<TypeExtends<number, NotUndef<LooseComplexObject['objArr']>[number]>>;

      type t_LooseTypeComplexNestedArrChanged = TypeExtends<number, NotUndef<LooseComplexObject['docArr']>[number]['a']>;
      type t_LooseTypeComplexNestedArrChangedNeg = Invert<TypeExtends<string, NotUndef<LooseComplexObject['docArr']>[number]['a']>>;

      type t_LooseTypeStringUnionToString = TypeEquals<[NotUndef<LooseComplexObject['strUnion']>], [ComplexObject['strUnion']]>;

      type LooseMongooseDoc = LooseType<TestDoc>;
      type LooseRawDoc = LooseType<TestDocObject>;
      type t_LooseTypeMongooseDoc = TypeEquals<[LooseMongooseDoc], [LooseType<TestDocObject>]>;


      type TESTAGG_LooseTypes = NotAny<Yes
          & t_LooseTypeObjectIdString & t_LooseTypeObjectIdOid
          & t_LooseTypeObjectIdDoc & t_LooseTypeObjectIdNum
          & t_LooseTypeDateDate & t_LooseTypeDateNumber & t_LooseTypeDateBoolean
          & t_LooseTypeComplexBaseUnchanged & t_LooseTypeComplexBaseUnchangedNeg
          & t_LooseTypeComplexBaseChanged & t_LooseTypeComplexBaseChangedNeg
          & t_LooseTypeComplexBaseArrChanged & t_LooseTypeComplexBaseArrChangedNeg
          & t_LooseTypeComplexNestedArrChanged & t_LooseTypeComplexNestedArrChangedNeg
          & t_LooseTypeStringUnionToString & t_LooseTypeMongooseDoc
      >;

      type DocToObjectReturnType = ReturnType<NotUndef<TestDoc['toObject']>>;
      type DocToJSONReturnType = ReturnType<NotUndef<TestDoc['toJSON']>>;
      type DocQuery = ReturnType<mongoose.Model<TestDoc>['find']>;
      type DocLeanQuery = ReturnType<DocQuery['lean']>;
      type t_toObjectRetTypeIsLeanDoc = TypeEquals<LeanTestDoc, DocToObjectReturnType>;
      type t_toJSONRetTypeIsLeanDoc = TypeEquals<LeanTestDoc, DocToJSONReturnType>;
      type DocLeanQueryExec = ReturnType<DocLeanQuery['exec']>;
      type t_QueryLeanRetTypeIsLeanDoc = TypeEquals<DocLeanQueryExec, Promise<LeanTestDoc[]>>;

      type TESTAGG_DocFuncTests = NotAny<Yes
          & t_toObjectRetTypeIsLeanDoc & t_toJSONRetTypeIsLeanDoc
      >;

      /////////////////////////////////
      // Tests for Model / Document
      /////////////////////////////////

      type TestDocModel = Model<TestDoc>;
      type constructorParam = NotUndef<ConstructorParameters<TestDocModel>[0]>;
      type instanceType = InstanceType<TestDocModel>;
      type t_ConstructTypeCorrect = TypeEquals<instanceType, TestDoc>;
      type t_ConstructParamCorrect = TypeEquals<constructorParam, LooseType<TestDoc>>;

      type TESTAGG_ModelTests = NotAny<Yes
        & t_ConstructTypeCorrect & t_ConstructParamCorrect
      >;

      type AllTests = NotAny<Yes
          & TESTAGG_DocTests1
          & TESTAGG_DocTests2
          & TESTAGG_LooseTypes
          & TESTAGG_DocFuncTests
          & TESTAGG_ModelTests
      >;
    }
  }
