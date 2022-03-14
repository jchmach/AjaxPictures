export const {
    APP_PORT = 5000,
    NODE_ENV = 'development',
    CONNECTION_URL = "mongodb+srv://ajaxpictures:utscajax1109@ajaxpicturescluster.kyqfu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
} = process.env

export const IN_PROD = NODE_ENV === 'production';