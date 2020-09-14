public class SFS_CustDetailsController {

  @AuraEnabled
  public static List<wrapCustDetail> doCallout() {
    Http h = new Http();
    HttpRequest req = new HttpRequest();
    req.setEndpoint('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json');
    req.setMethod('GET');
    HttpResponse res = h.send(req);
    List<wrapCustDetail> details = (List<wrapCustDetail>)JSON.deserialize(res.getBody(),List<wrapCustDetail>.class);
    return details;
  }

  public class wrapCustDetail {
    @AuraEnabled
    public integer id {get; set;}
    @AuraEnabled
    public String creditorName {get; set;}
    @AuraEnabled
    public String firstName {get; set;}
    @AuraEnabled
    public String lastName {get; set;}
    @AuraEnabled
    public Double minPaymentPercentage {get; set;}
    @AuraEnabled
    public Double balance {get; set;}
  }
}