using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAppBackend.Models;

[Keyless]
[Table("SETTING")]
public partial class Setting
{
    [Column("TAX", TypeName = "decimal(10, 2)")]
    public decimal Tax { get; set; }
}
