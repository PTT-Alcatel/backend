using Rainbow;
using Rainbow.Model;

string email = "iaydin1@cfai-formation.fr";
string password = "Motdepasse1+";
string applicationID = "3f17d400c49911edb7d22fba16605e6b";
string secretKey = "xzH3sW6Ap68A0fE2nqxU1II7OYmxvFRr1vdnEaqzQjlIdIJkUNA3oSrh9hsTfhoG";
string hostname = "WEB-SANDBOX.OPENRAINBOW.COM";

Rainbow.Application myApp = new Rainbow.Application();
myApp.SetApplicationInfo(applicationID, secretKey);
myApp.SetHostInfo(hostname);

// We ask to log to server using login / password
myApp.Login(email , password, callback =>
{
    if(callback.Result.Success)
    {
        Console.WriteLine("Login successfull");
        // The login / pwd is correct
        // The SDK continue internally initialization process. We need to wait its end.
    }
    else
    {
        // A pb occurs
        if(callback.Result.Type == SdkError.SdkErrorType.IncorrectUse)
        {
            // Bad parameter(s) used
            string errMsg = callback.Result.IncorrectUseError.ErrorMsg; 
            Console.WriteLine("Login failed: " + errMsg);
        }
        else
        {
            // Exception occurs
            Exception e = callback.Result.ExceptionError;
            Console.WriteLine("Login failed: " + e.Message);
        }
    }
});

