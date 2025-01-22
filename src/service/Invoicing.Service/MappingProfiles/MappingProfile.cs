using AutoMapper;
using Invoicing.Data.Domain;
using Invoicing.Data.Domain.Events;
using Invoicing.Messaging;
using Invoicing.Messaging.Commands;

namespace Invoicing.Service.MappingProfiles;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        //CreateMap<AccessorialCharge, Data.Domain.AccessorialCharge>().ReverseMap();
        CreateMap<AddInvoiceLine, InvoiceLineAdded>().ReverseMap();
        CreateMap<CreateInvoice, InvoiceCreated>().ReverseMap();
      
        CreateMap<InvoiceLine, Data.Domain.Invoice.InvoiceLine>().ReverseMap();
        
        //CreateMap<PostInvoice, InvoicePosted>().ReverseMap();
    }
}