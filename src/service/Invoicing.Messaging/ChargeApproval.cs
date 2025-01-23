namespace Invoicing.Messaging;

public class ChargeApproval
{
    public string ShipmentId { get; set; } = string.Empty;
    public DateTime ApprovalRequestDate { get; set; }
    public string RaisedBy { get; set; } = string.Empty;
    public List<string> ReviewBy { get; set; } = new();
    public string Reason { get; set; } = string.Empty;
    public double? FuelCost { get; set; }
    public double? FuelCharge { get; set; }
    public double? FreightCost { get; set; }
    public double? FreightCharge { get; set; }
    public List<AccessorialCharge> Accessorials { get; set; } = new();
    public string ApprovalStatus { get; set; } = string.Empty;
}