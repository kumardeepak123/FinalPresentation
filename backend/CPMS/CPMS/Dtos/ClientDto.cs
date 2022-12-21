using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Dtos
{
    public class ClientDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Organization { get; set; }
        public string ProfileImageName { get; set; }
        public string AgreementPaperName { get; set; }
        public string ProfileImageSrc { get; set; }
        public string AgreementPaperSrc { get; set; }
    }
}
