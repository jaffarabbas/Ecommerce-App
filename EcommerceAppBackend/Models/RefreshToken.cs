using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAppBackend.Models;

[Table("REFRESH_TOKEN")]
public partial class RefreshToken
{
    [Key]
    [Column("rid")]
    public int Rid { get; set; }

    [Column("ruid")]
    public int Ruid { get; set; }

    [Column("refresh_token")]
    public string RefreshToken1 { get; set; } = null!;

    [Required]
    [Column("rstatus")]
    public bool? Rstatus { get; set; }

    [Column("rcreatedat", TypeName = "datetime")]
    public DateTime Rcreatedat { get; set; }

    [ForeignKey("Ruid")]
    [InverseProperty("RefreshTokens")]
    public virtual User Ru { get; set; } = null!;
}
