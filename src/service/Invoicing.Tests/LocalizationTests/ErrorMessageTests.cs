using Invoicing.Service;
using System.Collections;
using System.Globalization;
using Xunit.Abstractions;

namespace Invoicing.Tests.LocalizationTests
{
    public class ErrorMessageTests
    {
        const string TestId = "5ea13788-45ae-4123-a309-bf2f95dc9280";
        private readonly ITestOutputHelper _output;
        private readonly ErrorMessages _errorMessages;

        public ErrorMessageTests(ITestOutputHelper output)
        {
            _output = output;
            _errorMessages = new ErrorMessages();
        }

        [Theory]
        [ClassData(typeof(MethodNameCultureBasedTestData))]
        public void Test_all_localization_helper_methods(CultureInfo culture, CodeResultMethodName[] codeResults)
        {
            var originalCulture = CultureInfo.CurrentCulture;
            CultureInfo.CurrentCulture = culture;
            var messagesTested = 0;

            foreach (var cr in codeResults)
            {
                messagesTested++;
                var type = typeof(ErrorMessages);
                var methodInfo = type.GetMethod(cr.MethodName);
                if (methodInfo != null)
                {
                    var messageString = methodInfo.Invoke(_errorMessages, cr.Data?.ToArray());
                    _output.WriteLine(message: messageString.ToString());
                    Assert.Equal(expected: cr.Result, actual: messageString);
                }
            }

            Assert.Equal(expected: _errorMessages.CodeCount(), actual: messagesTested);
            CultureInfo.CurrentCulture = originalCulture;
        }

        [Fact]
        public void Error_message_1000_For_Spanish()
        {
            // Arrange
            var expected = $"La factura '{TestId}' no existe. (IN-1000)";
            var originalCulture = CultureInfo.CurrentCulture;
            CultureInfo.CurrentCulture = new CultureInfo("es-MX");

            // Act
            var actual = _errorMessages
                .InvoiceDoesNotExist(TestId);

            // Assert
            Assert.Equal(expected, actual);

            // Cleanup
            CultureInfo.CurrentCulture = originalCulture;
        }

        [Fact]
        public void Error_message_1000_For_English()
        {
            // Arrange
            var expected = $"The invoice '{TestId}' does not exist. (IN-1000)";
            var originalCulture = CultureInfo.CurrentCulture;
            CultureInfo.CurrentCulture = new CultureInfo("en-US");

            // Act
            var actual = _errorMessages
                .InvoiceDoesNotExist(TestId);

            // Assert
            Assert.Equal(expected, actual);

            // Cleanup
            CultureInfo.CurrentCulture = originalCulture;
        }
    }

    public record CodeResultMethodName(string MethodName, string Result, IEnumerable<object>? Data = null);

    public class MethodNameCultureBasedTestData : IEnumerable<object[]>
    {
        private static readonly CultureInfo EnUs;
        private static readonly CultureInfo EsMx;

        static MethodNameCultureBasedTestData()
        {
            EnUs = new CultureInfo(name: "en-US");
            EsMx = new CultureInfo(name: "es-MX");
        }

        private const string ErrorCode0 = "IN-1000";
        private const string ErrorCode1 = "IN-1001";
        private const string ErrorCode2 = "IN-1002";
        private const string ErrorCode3 = "IN-1003";
        private const string ErrorCode4 = "IN-1004";

        private const string InvoiceId = "5ea13788-45ae-4123-a309-bf2f95dc9280";
        private const string ShipmentId = "f6c2fb37-4391-4e4f-bade-7c842ea59e23";

        private readonly List<object[]> _data = new()
        {
            new object[]
            {
                CultureInfo.InvariantCulture, new CodeResultMethodName[]
                {
                    new(nameof(ErrorMessages.InvoiceDoesNotExist),
                        $"The invoice '{InvoiceId}' does not exist. ({ErrorCode0})",
                        new[] { InvoiceId }),
                    new(nameof(ErrorMessages.ShipmentChargeAlreadyExists),
                        $"The shipment charge for shipment '{ShipmentId}' already exists with invoice '{InvoiceId}'. ({ErrorCode1})",
                        new[] { ShipmentId, InvoiceId }),
                    new(nameof(ErrorMessages.InvoiceAlreadyExists),
                        $"Invoice id '{InvoiceId}' already exists. ({ErrorCode2})",
                        new[] { InvoiceId }),
                    new(nameof(ErrorMessages.ShipmentAlreadyAttachedToInvoice),
                        $"Shipment(s) '{ShipmentId}' already attached to invoice. ({ErrorCode3})",
                        new[] { ShipmentId }),
                    new(nameof(ErrorMessages.InvoiceAlreadyPosted),
                        $"Invoice '{InvoiceId}' already posted. ({ErrorCode4})",
                        new[] { InvoiceId })
                }
            },
            new object[]
            {
                EnUs, new CodeResultMethodName[]
                {
                    new(nameof(ErrorMessages.InvoiceDoesNotExist),
                        $"The invoice '{InvoiceId}' does not exist. ({ErrorCode0})",
                        new[] { InvoiceId }),
                    new(nameof(ErrorMessages.ShipmentChargeAlreadyExists),
                        $"The shipment charge for shipment '{ShipmentId}' already exists with invoice '{InvoiceId}'. ({ErrorCode1})",
                        new[] { ShipmentId, InvoiceId }),
                    new(nameof(ErrorMessages.InvoiceAlreadyExists),
                        $"Invoice id '{InvoiceId}' already exists. ({ErrorCode2})",
                        new[] { InvoiceId }),
                    new(nameof(ErrorMessages.ShipmentAlreadyAttachedToInvoice),
                        $"Shipment(s) '{ShipmentId}' already attached to invoice. ({ErrorCode3})",
                        new[] { ShipmentId }),
                    new(nameof(ErrorMessages.InvoiceAlreadyPosted),
                        $"Invoice '{InvoiceId}' already posted. ({ErrorCode4})",
                        new[] { InvoiceId })
                }
            },
            new object[]
            {
                EsMx, new CodeResultMethodName[]
                {
                    new(nameof(ErrorMessages.InvoiceDoesNotExist),
                        $"La factura '{InvoiceId}' no existe. ({ErrorCode0})",
                        new[] { InvoiceId }),
                    new(nameof(ErrorMessages.ShipmentChargeAlreadyExists),
                        $"El cargo de envío para el envío '{ShipmentId}' ya existe con la factura '{InvoiceId}'. ({ErrorCode1})",
                        new[] { ShipmentId, InvoiceId }),
                    new(nameof(ErrorMessages.InvoiceAlreadyExists),
                        $"El ID de factura '{InvoiceId}' ya existe. ({ErrorCode2})",
                        new[] { InvoiceId }),
                    new(nameof(ErrorMessages.ShipmentAlreadyAttachedToInvoice),
                        $"Envío(s) '{ShipmentId}' ya adjuntos a la factura. ({ErrorCode3})",
                        new[] { ShipmentId }),
                    new(nameof(ErrorMessages.InvoiceAlreadyPosted),
                        $"La factura '{InvoiceId}' ya está publicada. ({ErrorCode4})",
                        new[] { InvoiceId }),
                }
            }
        };

        public IEnumerator<object[]> GetEnumerator() => _data.GetEnumerator();

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }
}
